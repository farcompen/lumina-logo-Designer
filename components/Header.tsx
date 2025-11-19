import React from 'react';
import { PenTool, Zap } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-brand-400 to-brand-600 p-2 rounded-lg shadow-lg shadow-brand-500/20">
            <PenTool className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">Lumina</h1>
            <p className="text-xs text-slate-400 font-medium">AI Logo Architect</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium">
                <Zap className="w-3.5 h-3.5 mr-2" />
                Instant Generation
            </span>
        </div>
      </div>
    </header>
  );
};

export default Header;