// App.js — Root layout: Sidebar + Canvas + Bottom toolbar + Result modal

import { Sidebar } from './components/ui/Sidebar';
import { Canvas } from './components/ui/Canvas';
import { SubmitButton } from './components/ui/SubmitButton';
import { ResultModal } from './components/ui/ResultModal';
import { useSubmitPipeline } from './hooks/useSubmitPipeline';
import { useSidebar } from './hooks/useSidebar';
import { HiOutlineBars3 } from 'react-icons/hi2';

function App() {
  const { submit, loading, error, result, clearResult } = useSubmitPipeline();
  const { isOpen, isMobile, close, toggle } = useSidebar();

  return (
    <div className="app">
      <Sidebar isOpen={isOpen} isMobile={isMobile} onClose={close} />
      <main className="app__main">
        {isMobile && (
          <button
            className="app__menu-toggle"
            onClick={toggle}
            aria-label="Toggle node sidebar"
            type="button"
          >
            <HiOutlineBars3 size={20} />
          </button>
        )}
        <Canvas onCanvasClick={isMobile ? close : undefined} />
        <div className="app__toolbar">
          <SubmitButton onSubmit={submit} loading={loading} />
        </div>
      </main>
      <ResultModal result={result} error={error} onClose={clearResult} />
    </div>
  );
}

export default App;
