import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import LogoForm from './components/LogoForm';
import LogoDisplay from './components/LogoDisplay';
import HistorySidebar from './components/HistorySidebar';
import { generateLogoDesign } from './services/geminiService';
import { GeneratedLogo, LogoRequest } from './types';
import { LayoutGrid } from 'lucide-react';

const App: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentLogo, setCurrentLogo] = useState<GeneratedLogo | null>(null);
  const [history, setHistory] = useState<GeneratedLogo[]>([]);
  const [showHistoryMobile, setShowHistoryMobile] = useState(false);

  const handleGenerate = useCallback(async (request: LogoRequest) => {
    setIsGenerating(true);
    try {
      const result = await generateLogoDesign(request);
      
      const newLogo: GeneratedLogo = {
        id: uuidv4(),
        svg: result.svg,
        concept: result.concept,
        palette: result.palette,
        timestamp: Date.now(),
        request: request
      };

      setCurrentLogo(newLogo);
      setHistory(prev => [newLogo, ...prev]);
    } catch (error) {
      alert("Failed to generate logo. Please try again.");
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const handleSelectHistory = (logo: GeneratedLogo) => {
    setCurrentLogo(logo);
    setShowHistoryMobile(false);
  };

  const handleClearHistory = () => {
      setHistory([]);
      setCurrentLogo(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 text-slate-200 flex flex-col font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-6">
            <LogoForm onSubmit={handleGenerate} isGenerating={isGenerating} />
            
            {/* Desktop History - only show if not empty */}
            <div className="hidden lg:block h-[calc(100vh-600px)] min-h-[200px]">
                <HistorySidebar 
                    history={history} 
                    onSelect={handleSelectHistory} 
                    onClear={handleClearHistory}
                    currentId={currentLogo?.id} 
                />
            </div>
            
            {/* Mobile History Toggle */}
            <div className="lg:hidden">
                {history.length > 0 && (
                    <button 
                        onClick={() => setShowHistoryMobile(!showHistoryMobile)}
                        className="w-full py-3 px-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                    >
                        <span className="flex items-center">
                            <LayoutGrid className="w-4 h-4 mr-2" />
                            View History ({history.length})
                        </span>
                        <span className="text-xs bg-slate-800 px-2 py-1 rounded-full">{showHistoryMobile ? 'Hide' : 'Show'}</span>
                    </button>
                )}
                
                {showHistoryMobile && (
                    <div className="mt-4 max-h-96 overflow-y-auto">
                        <HistorySidebar 
                            history={history} 
                            onSelect={handleSelectHistory} 
                            onClear={handleClearHistory}
                            currentId={currentLogo?.id} 
                        />
                    </div>
                )}
            </div>
          </div>

          {/* Right Column: Display */}
          <div className="lg:col-span-8 xl:col-span-9">
            <LogoDisplay logo={currentLogo} isGenerating={isGenerating} />
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} Lumina Logo Designer. Generated SVG code is yours to keep.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
