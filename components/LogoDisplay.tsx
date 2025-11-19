import React, { useEffect, useRef, useState } from 'react';
import { GeneratedLogo } from '../types';
import { Download, Copy, Check, Maximize2, RefreshCw } from 'lucide-react';

interface LogoDisplayProps {
  logo: GeneratedLogo | null;
  isGenerating: boolean;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({ logo, isGenerating }) => {
  const [copied, setCopied] = useState(false);
  const [bgMode, setBgMode] = useState<'dark' | 'light' | 'grid'>('grid');
  const svgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logo && svgContainerRef.current) {
      svgContainerRef.current.innerHTML = logo.svg;
      // Ensure SVG scales correctly
      const svgElement = svgContainerRef.current.querySelector('svg');
      if (svgElement) {
        svgElement.setAttribute('width', '100%');
        svgElement.setAttribute('height', '100%');
        svgElement.style.maxHeight = '100%';
      }
    }
  }, [logo]);

  const handleDownload = (format: 'svg' | 'png') => {
    if (!logo) return;

    if (format === 'svg') {
      const blob = new Blob([logo.svg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${logo.request.brandName.replace(/\s+/g, '_').toLowerCase()}_logo.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Convert to PNG via Canvas
      const svg = svgContainerRef.current?.querySelector('svg');
      if (!svg) return;
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const svgData = new XMLSerializer().serializeToString(svg);
      const img = new Image();
      const svgBlob = new Blob([svgData], {type: 'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = 1024; // High res
        canvas.height = 1024;
        if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, 1024, 1024);
            const pngUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = pngUrl;
            link.download = `${logo.request.brandName.replace(/\s+/g, '_').toLowerCase()}_logo.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  };

  const copyToClipboard = () => {
    if (!logo) return;
    navigator.clipboard.writeText(logo.svg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isGenerating) {
    return (
      <div className="h-full min-h-[400px] bg-slate-900/50 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-8 animate-pulse backdrop-blur-sm">
        <div className="w-24 h-24 rounded-full bg-brand-500/20 flex items-center justify-center mb-6 relative">
            <div className="absolute inset-0 border-4 border-brand-500/30 border-t-brand-500 rounded-full animate-spin"></div>
            <RefreshCw className="w-10 h-10 text-brand-400 animate-pulse" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Generating Concept...</h3>
        <p className="text-slate-400 text-center max-w-xs">The AI is sketching vectors, choosing palettes, and refining shapes.</p>
      </div>
    );
  }

  if (!logo) {
    return (
      <div className="h-full min-h-[400px] bg-slate-900/50 border border-slate-800 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 text-center backdrop-blur-sm">
        <div className="w-20 h-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 rotate-3 hover:rotate-6 transition-transform duration-300">
          <Maximize2 className="w-10 h-10 text-slate-600" />
        </div>
        <h3 className="text-lg font-medium text-slate-300 mb-2">No Logo Generated Yet</h3>
        <p className="text-slate-500 max-w-sm">Fill out the form on the left to create your first professional vector logo.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Preview Area */}
      <div className="relative group rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
        {/* Background Toggle */}
        <div className="absolute top-4 right-4 z-10 flex bg-slate-900/80 backdrop-blur rounded-lg p-1 border border-slate-700">
           <button 
             onClick={() => setBgMode('grid')}
             className={`p-1.5 rounded-md ${bgMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white'}`}
             title="Transparency Grid"
           >
             <div className="w-4 h-4 grid grid-cols-2 gap-0.5 opacity-60">
                <div className="bg-current aspect-square"></div>
                <div className="border border-current aspect-square"></div>
                <div className="border border-current aspect-square"></div>
                <div className="bg-current aspect-square"></div>
             </div>
           </button>
           <button 
             onClick={() => setBgMode('light')}
             className={`p-1.5 rounded-md ${bgMode === 'light' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-white'}`}
             title="Light Background"
           >
             <div className="w-4 h-4 bg-white border border-current rounded-sm"></div>
           </button>
           <button 
             onClick={() => setBgMode('dark')}
             className={`p-1.5 rounded-md ${bgMode === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
             title="Dark Background"
           >
             <div className="w-4 h-4 bg-slate-900 border border-current rounded-sm"></div>
           </button>
        </div>

        {/* Canvas */}
        <div 
            className={`w-full aspect-square flex items-center justify-center p-12 transition-colors duration-300
                ${bgMode === 'light' ? 'bg-white' : ''}
                ${bgMode === 'dark' ? 'bg-slate-950' : ''}
                ${bgMode === 'grid' ? 'bg-[url("https://www.transparenttextures.com/patterns/cubes.png")] bg-slate-800' : ''}
            `}
        >
            <div ref={svgContainerRef} className="w-full h-full drop-shadow-2xl transform transition-transform duration-500 hover:scale-105" />
        </div>
      </div>

      {/* Details & Actions */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 backdrop-blur-sm flex-grow flex flex-col">
        <div className="flex items-start justify-between mb-6">
            <div>
                <h3 className="text-xl font-bold text-white mb-1">{logo.request.brandName}</h3>
                <p className="text-sm text-brand-400 font-medium uppercase tracking-wider">{logo.request.style}</p>
            </div>
            <div className="flex space-x-1">
                 {logo.palette.map((color, i) => (
                     <div key={i} className="w-6 h-6 rounded-full border border-slate-700 shadow-sm" style={{ backgroundColor: color }} title={color} />
                 ))}
            </div>
        </div>
        
        <p className="text-slate-300 text-sm leading-relaxed mb-8 flex-grow">
            <span className="text-slate-500 font-semibold block mb-1 text-xs uppercase tracking-widest">Concept</span>
            {logo.concept}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button 
                onClick={() => handleDownload('svg')}
                className="flex items-center justify-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors"
            >
                <Download className="w-4 h-4 mr-2" />
                SVG
            </button>
            <button 
                onClick={() => handleDownload('png')}
                className="flex items-center justify-center px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg border border-slate-700 transition-colors"
            >
                <Download className="w-4 h-4 mr-2" />
                PNG
            </button>
            <button 
                onClick={copyToClipboard}
                className="col-span-2 sm:col-span-1 flex items-center justify-center px-4 py-2.5 bg-brand-600/10 hover:bg-brand-600/20 text-brand-400 text-sm font-medium rounded-lg border border-brand-500/20 transition-colors"
            >
                {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                {copied ? 'Copied' : 'Code'}
            </button>
        </div>
      </div>
    </div>
  );
};

export default LogoDisplay;
