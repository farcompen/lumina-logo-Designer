import React, { useState } from 'react';
import { LogoRequest, LogoStyle } from '../types';
import { Wand2, Loader2, Palette, Briefcase, Type, MessageSquare } from 'lucide-react';

interface LogoFormProps {
  onSubmit: (data: LogoRequest) => void;
  isGenerating: boolean;
}

const LogoForm: React.FC<LogoFormProps> = ({ onSubmit, isGenerating }) => {
  const [formData, setFormData] = useState<LogoRequest>({
    brandName: '',
    industry: '',
    style: LogoStyle.MODERN,
    colors: '',
    description: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.brandName.trim() && formData.industry.trim()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 md:p-8 shadow-xl backdrop-blur-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create your identity</h2>
        <p className="text-slate-400 text-sm">Tell us about your brand, and our AI will craft a unique vector logo for you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Brand Name */}
        <div className="space-y-2">
          <label htmlFor="brandName" className="flex items-center text-sm font-medium text-slate-300">
            <Type className="w-4 h-4 mr-2 text-brand-400" />
            Brand Name
          </label>
          <input
            type="text"
            id="brandName"
            name="brandName"
            required
            value={formData.brandName}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
            placeholder="e.g. Quantum Coffee"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label htmlFor="industry" className="flex items-center text-sm font-medium text-slate-300">
            <Briefcase className="w-4 h-4 mr-2 text-brand-400" />
            Industry
          </label>
          <input
            type="text"
            id="industry"
            name="industry"
            required
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
            placeholder="e.g. Technology, Bakery, Finance"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Style */}
          <div className="space-y-2">
            <label htmlFor="style" className="flex items-center text-sm font-medium text-slate-300">
              <Wand2 className="w-4 h-4 mr-2 text-brand-400" />
              Style
            </label>
            <div className="relative">
              <select
                id="style"
                name="style"
                value={formData.style}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white appearance-none transition-all"
              >
                {Object.values(LogoStyle).map((style) => (
                  <option key={style} value={style}>{style}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-2">
            <label htmlFor="colors" className="flex items-center text-sm font-medium text-slate-300">
              <Palette className="w-4 h-4 mr-2 text-brand-400" />
              Color Preferences
            </label>
            <input
              type="text"
              id="colors"
              name="colors"
              value={formData.colors}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white placeholder-slate-600 transition-all"
              placeholder="e.g. Blue and Gold, Pastel"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label htmlFor="description" className="flex items-center text-sm font-medium text-slate-300">
            <MessageSquare className="w-4 h-4 mr-2 text-brand-400" />
            Additional Details (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-white placeholder-slate-600 resize-none transition-all"
            placeholder="Any specific symbols or ideas? e.g., incorporate a leaf"
          />
        </div>

        <button
          type="submit"
          disabled={isGenerating}
          className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg shadow-lg shadow-brand-500/25 transition-all duration-200 
            ${isGenerating 
              ? 'bg-slate-800 cursor-not-allowed opacity-80' 
              : 'bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 hover:shadow-brand-500/40 active:scale-[0.98]'
            }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-6 h-6 mr-2 animate-spin" />
              Crafting Logo...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              Generate Logo
              <Wand2 className="w-5 h-5 ml-2" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default LogoForm;
