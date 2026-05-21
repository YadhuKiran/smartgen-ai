import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Loader2, Sparkles, CheckCircle2, ChevronRight, BarChart3, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AudienceComparison() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    category: 'Technology',
    audience1: 'Gen Z',
    audience2: 'Professionals'
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setResult(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/generate-comparison`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to generate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-600/20 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[150px] rounded-full"></div>
      </div>

      <div className="p-8 pb-4 relative z-10 flex-shrink-0">
        <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-white">Audience Split-Testing</h1>
        <p className="text-slate-400 text-sm max-w-2xl">See exactly how SmartGen AI adapts emotional triggers and vocabulary to target vastly different demographics simultaneously.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative z-10 no-scrollbar">
        {!result && !isGenerating ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl"
          >
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" /> Comparison Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative group">
                  <input 
                    type="text" required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer"
                    value={formData.productName}
                    onChange={(e) => setFormData({...formData, productName: e.target.value})}
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400">
                    Product Name
                  </label>
                </div>
                <div className="relative group">
                  <select 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {['Technology', 'Food', 'Fashion', 'Fitness', 'Education', 'Beauty', 'Travel', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <label className="absolute text-sm text-purple-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4">
                    Category
                  </label>
                </div>
              </div>
              
              <div className="relative group">
                <textarea 
                  required rows="2"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer resize-none"
                  value={formData.productDescription}
                  onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                  placeholder=" "
                />
                <label className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400">
                  Product Description
                </label>
              </div>

              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                <div className="bg-gradient-to-br from-pink-500/10 to-transparent p-4 rounded-2xl border border-pink-500/20">
                  <label className="block text-xs font-bold text-pink-400 uppercase tracking-widest mb-2">Audience A</label>
                  <select 
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                    value={formData.audience1}
                    onChange={(e) => setFormData({...formData, audience1: e.target.value})}
                  >
                    {['Gen Z', 'Students', 'Gamers', 'Fitness Enthusiasts'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400 border border-slate-700">VS</div>
                
                <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-4 rounded-2xl border border-blue-500/20">
                  <label className="block text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Audience B</label>
                  <select 
                    className="w-full bg-slate-900 border border-white/5 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                    value={formData.audience2}
                    onChange={(e) => setFormData({...formData, audience2: e.target.value})}
                  >
                    {['Professionals', 'Parents', 'Luxury Customers', 'Entrepreneurs'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full relative group overflow-hidden rounded-xl bg-slate-800"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold py-4 px-6 transition-all">
                  Analyze & Generate Profiles
                </div>
              </button>
            </form>
          </motion.div>
        ) : isGenerating ? (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="flex gap-16 items-center">
              <div className="w-20 h-20 rounded-full border-t-2 border-pink-500 animate-spin flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-l-2 border-pink-400 animate-spin" style={{animationDirection: 'reverse'}}></div>
              </div>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <div className="w-20 h-20 rounded-full border-t-2 border-blue-500 animate-spin flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-r-2 border-blue-400 animate-spin" style={{animationDirection: 'reverse'}}></div>
              </div>
            </div>
            <h3 className="mt-8 text-xl font-display font-bold text-white">Synthesizing Psychographic Profiles</h3>
            <p className="text-slate-400 text-sm mt-2">Running dual-model generation for cognitive alignment...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8 h-full">
            {/* Audience 1 Result */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-sm font-bold tracking-wider uppercase">
                  Profile A: {result.audience1.audience}
                </div>
              </div>
              
              <div className="flex-1 bg-gradient-to-b from-pink-900/10 to-[#0b0f19] border border-pink-500/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 blur-[80px] rounded-full group-hover:bg-pink-500/20 transition-colors"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8">
                    <div className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest mb-3">AI Generated Slogan</div>
                    <div className="text-3xl font-display font-bold text-white leading-tight">"{result.audience1.slogan}"</div>
                  </div>
                  
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest mb-3">Targeted Ad Copy</div>
                    <p className="text-slate-300 text-lg leading-relaxed">{result.audience1.adCopy}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-pink-500/20">
                    <div className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest mb-3 flex items-center gap-2"><Activity size={12}/> Dominant Triggers</div>
                    <div className="flex flex-wrap gap-2">
                      {result.audience1.keyDifferences?.map((diff, i) => (
                        <span key={i} className="bg-pink-500/10 text-pink-300 px-3 py-1 rounded-md text-sm border border-pink-500/20 shadow-[0_0_10px_rgba(236,72,153,0.1)]">{diff}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Audience 2 Result */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4 justify-end">
                <div className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold tracking-wider uppercase">
                  Profile B: {result.audience2.audience}
                </div>
              </div>
              
              <div className="flex-1 bg-gradient-to-b from-blue-900/10 to-[#0b0f19] border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8">
                    <div className="text-[10px] font-bold text-blue-500/70 uppercase tracking-widest mb-3 text-right">AI Generated Slogan</div>
                    <div className="text-3xl font-display font-bold text-white leading-tight text-right">"{result.audience2.slogan}"</div>
                  </div>
                  
                  <div className="mb-8 flex-1">
                    <div className="text-[10px] font-bold text-blue-500/70 uppercase tracking-widest mb-3 text-right">Targeted Ad Copy</div>
                    <p className="text-slate-300 text-lg leading-relaxed text-right">{result.audience2.adCopy}</p>
                  </div>

                  <div className="mt-auto pt-6 border-t border-blue-500/20">
                    <div className="text-[10px] font-bold text-blue-500/70 uppercase tracking-widest mb-3 flex items-center gap-2 justify-end"><Activity size={12}/> Dominant Triggers</div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {result.audience2.keyDifferences?.map((diff, i) => (
                        <span key={i} className="bg-blue-500/10 text-blue-300 px-3 py-1 rounded-md text-sm border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]">{diff}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Control Panel to Reset */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="lg:col-span-2 flex justify-center mt-4"
            >
              <button 
                onClick={() => setResult(null)}
                className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-8 py-3 rounded-full text-sm font-bold transition-all"
              >
                Run New Comparison
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
