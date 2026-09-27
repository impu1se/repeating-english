import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SpeechErrors } from './SpeechErrors';
import { content } from '../content';
import { loadProgress } from '../store/progress';

beforeEach(() => localStorage.clear());

const grammar = content.concepts.filter((c) => c.kind === 'grammar');

function profileJson(errors: unknown[], wordCount = 200, recordedAt = '2026-09-27') {
  return JSON.stringify({
    app: 'english-gym',
    format: 1,
    recordedAt,
    wordCount,
    contentVersion: content.version,
    errors,
  });
}

// userEvent.type трактует `{` и `[` как описания клавиш, поэтому JSON именно
// вставляем: сначала фокус в поле, потом paste.
async function pasteProfile(json: string) {
  await userEvent.click(screen.getByRole('button', { name: 'Вставить текстом' }));
  await userEvent.click(screen.getByLabelText('текст разбора'));
  await userEvent.paste(json);
  await userEvent.click(screen.getByRole('button', { name: 'Загрузить разбор' }));
}

describe('SpeechErrors', () => {
  it('принимает разбор из вставленного текста и показывает частоту', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));

    expect(await screen.findByText(new RegExp(grammar[0].title))).toBeInTheDocument();
    expect(screen.getByText(/3 на 100 слов/)).toBeInTheDocument();
  });

  it('сохраняет замер в прогресс', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));
    await screen.findByText(new RegExp(grammar[0].title));

    expect(loadProgress(content).measurements).toHaveLength(1);
  });

  it('объясняет непонятный текст и ничего не сохраняет', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile('совсем не json');

    expect(await screen.findByRole('status')).toHaveTextContent('Это не JSON');
    expect(loadProgress(content).measurements).toHaveLength(0);
  });

  it('показывает ошибки без концепта отдельно и не даёт их тренировать', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);

    await pasteProfile(profileJson([{ conceptId: null, label: 'предлоги места', count: 3 }]));

    expect(await screen.findByText(/предлоги места/)).toBeInTheDocument();
    expect(screen.getByText(/тренировать нечем/)).toBeInTheDocument();
    // Замер уже есть, хотя все его ошибки без концепта: пустое состояние
    // не должно перекрывать реальный (пусть и целиком неразмеченный) замер.
    expect(screen.queryByText(/Замеров пока нет/)).not.toBeInTheDocument();
    // У ошибки без концепта нет кнопки — тренировать её нечем.
    expect(screen.queryByRole('button', { name: /предлоги места/ })).not.toBeInTheDocument();
  });

  it('принимает разбор из загруженного файла', async () => {
    render(<SpeechErrors onBack={() => {}} onDrill={() => {}} />);
    const file = new File(
      [profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }])],
      'profile.json',
      { type: 'application/json' },
    );

    await userEvent.upload(screen.getByLabelText('файл разбора'), file);

    expect(await screen.findByText(new RegExp(grammar[0].title))).toBeInTheDocument();
    expect(loadProgress(content).measurements).toHaveLength(1);
  });

  it('ведёт в тренировку концепта', async () => {
    const onDrill = vi.fn();
    render(<SpeechErrors onBack={() => {}} onDrill={onDrill} />);

    await pasteProfile(profileJson([{ conceptId: grammar[0].id, label: 'артикли', count: 6 }]));
    await userEvent.click(await screen.findByRole('button', { name: new RegExp(grammar[0].title) }));

    expect(onDrill).toHaveBeenCalledWith(grammar[0].id);
  });
});
