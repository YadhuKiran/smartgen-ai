import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Play, Loader2, Sparkles, Copy } from 'lucide-react';

export default function AudienceComparison() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    audiences: ['Students', 'Professionals'],
    brandTone: 'Energetic',
    platform: 'Instagram',
    language: 'English'
  });

  const availableAudiences = ['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Luxury Customers', 'Entrepreneurs', 'Gen Z'];

  const toggleAudience = (aud) => {
    setFormData(prev => {
      const newAudiences = prev.audiences.includes(aud)
        ? prev.audiences.filter(a => a !== aud)
        : [...prev.audiences, aud].slice(0, 3); // Max 3 for comparison
      return { ...prev, audiences: newAudiences };
    });
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (formData.audiences.length < 2) return;
    setIsGenerating(true);
    setResult(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/generate-comparison', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to generate comparison:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Users className="text-blue-400" /> Audience Comparison
        </h1>
        <p className="text-slate-400">See how AI adapts the exact same product message for different demographics.</p>
      </div>

      <div className="glassmorphism p-6 rounded-2xl border-slate-700/50 mb-8 max-w-4xl">
        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Product Name</label>
              <input 
                type="text" required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                value={formData.productName}
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Product Description</label>
              <input 
                type="text" required
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-blue-500"
                value={formData.productDescription}
                onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-3">Select Audiences to Compare (Max 3)</label>
            <div className="flex flex-wrap gap-2">
              {availableAudiences.map(aud => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => toggleAudience(aud)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.audiences.includes(aud) 
                      ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] border-blue-400' 
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  } border`}
                >
                  {aud}
                </button>
              ))}
            </div>
            {formData.audiences.length < 2 && (
              <p className="text-red-400 text-sm mt-2">Select at least 2 audiences.</p>
            )}
          </div>

          <button 
            type="submit"
            disabled={isGenerating || formData.audiences.length < 2}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-3 px-8 rounded-xl transition-all disabled:opacity-50"
          >
            {isGenerating ? <><Loader2 className="animate-spin" size={20} /> Analyzing Audiences...</> : <><Play size={20} /> Generate Comparison</>}
          </button>
        </form>
      </div>

      <AnimatePresence>
        {result && result.comparisons && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {result.comparisons.map((comp, idx) => (
              <div key={idx} className="glassmorphism p-6 rounded-2xl neon-border relative group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full"></div>
                <div className="text-xs uppercase font-bold tracking-wider text-blue-400 mb-4 flex items-center gap-2">
                  <Sparkles size={14}/> Target: {comp.audience}
                </div>
                
                <div className="mb-6">
                  <div className="text-[10px] uppercase text-slate-500 mb-1">Slogan</div>
                  <div className="text-xl font-bold text-white leading-snug">"{comp.slogan}"</div>
                </div>
                
                <div>
                  <div className="text-[10px] uppercase text-slate-500 mb-1">Ad Copy</div>
                  <div className="text-sm text-slate-300 leading-relaxed">{comp.adCopy}</div>
                </div>

                <button onClick={() => navigator.clipboard.writeText(comp.slogan + '\n' + comp.adCopy)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy size={16}/>
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
