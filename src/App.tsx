import { useState } from 'react';
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
        onComplete={() => setScreen('summary')}
        onExit={() => setScreen('list')}
      />
    );
  }
  if (screen === 'summary' && moduleId) {
    return <ModuleSummary moduleId={moduleId} onBack={() => setScreen('list')} />;
  }
  return (
    <ModuleList
      onPick={(id) => {
        setModuleId(id);
        setScreen('training');
      }}
    />
  );
}
