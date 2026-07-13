import { useState } from 'react';
import { content } from './content';
import { ModuleList } from './components/ModuleList';
import { Training } from './components/Training';
import { ModuleSummary } from './components/ModuleSummary';

type Screen = 'list' | 'training' | 'summary';

export default function App() {
  const [screen, setScreen] = useState<Screen>('list');
  const [moduleId, setModuleId] = useState<string | null>(null);

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
      onPick={(id) => {
        setModuleId(id);
        setScreen('training');
      }}
    />
  );
}
