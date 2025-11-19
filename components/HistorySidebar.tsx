import React from 'react';
import { GeneratedLogo } from '../types';
import { History, Clock, Trash2 } from 'lucide-react';

interface HistorySidebarProps {
  history: GeneratedLogo[];
  onSelect: (logo: GeneratedLogo) => void;
  onClear: () => void;
  currentId?: string;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, onClear, currentId }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center text-slate-200 font-semibold">
          <History className="w-4 h-4 mr-2 text-brand-400" />
          History
        </div>
        <button 
            onClick={onClear}
            className="text-slate-500 hover:text-red-400 transition-colors p-1 rounded hover:bg-slate-800"
            title="Clear History"
        >
            <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-y-auto space-y-3 pr-1 flex-grow custom-scrollbar">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group
                ${currentId === item.id 
                    ? 'bg-slate-800 border-brand-500/50 shadow-md shadow-brand-900/20' 
                    : 'bg-slate-950/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
          >
            <div className="flex items-start space-x-3">
                <div 
                    className="w-10 h-10 rounded-lg bg-slate-900 p-1 flex-shrink-0 overflow-hidden border border-slate-800"
                    dangerouslySetInnerHTML={{ __html: item.svg }} 
                />
                <div className="min-w-0 flex-1">
                    <h4 className={`text-sm font-medium truncate ${currentId === item.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>
                        {item.request.brandName}
                    </h4>
                    <div className="flex items-center mt-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;
