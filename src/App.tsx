import { useState } from 'react';
import { content } from './content';
import { Today } from './components/Today';
import { SpeechErrors } from './components/SpeechErrors';
import { FocusDrill } from './components/FocusDrill';
import { ModuleList } from './components/ModuleList';
import { Training } from './components/Training';
import { ModuleSummary } from './components/ModuleSummary';

type Screen = 'today' | 'errors' | 'focus' | 'list' | 'training' | 'summary';

const isoToday = () => new Date().toISOString().slice(0, 10);

export default function App() {
  const [screen, setScreen] = useState<Screen>('today');
  const [moduleId, setModuleId] = useState<string | null>(null);
  const [focusConceptId, setFocusConceptId] = useState<string | null>(null);

  function drill(conceptId: string) {
    setFocusConceptId(conceptId);
    setScreen('focus');
  }

  if (screen === 'today') {
    return (
      <Today
        onOpenErrors={() => setScreen('errors')}
        onOpenLevels={() => setScreen('list')}
        onDrill={drill}
      />
    );
  }
  if (screen === 'errors') {
    return <SpeechErrors onBack={() => setScreen('today')} onDrill={drill} />;
  }
  if (screen === 'focus' && focusConceptId) {
    return <FocusDrill conceptId={focusConceptId} today={isoToday()} onExit={() => setScreen('today')} />;
  }
  if (screen === 'training' && moduleId) {
    return (
      <Training
        moduleId={moduleId}
        onExit={() => setScreen('list')}
        onSummary={() => setScreen('summary')}
      />
    );
  }
  if (screen === 'summary' && moduleId) {
    return <ModuleSummary moduleId={moduleId} onBack={() => setScreen('list')} />;
  }
  // возврат из тренировки ведёт в папку уровня последнего модуля, не в корень
  const lastLevel = moduleId ? content.modules.find((m) => m.id === moduleId)?.level ?? null : null;
  return (
    <ModuleList
      initialLevel={lastLevel}
      onBack={() => setScreen('today')}
      onPick={(id) => {
        setModuleId(id);
        setScreen('training');
      }}
    />
  );
}
