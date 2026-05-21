import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Loader2, Sparkles, CheckCircle2, X, Plus, BrainCircuit, Activity, ChevronRight, BarChart3, Target, Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

const MultiAILoadingOrb = () => {
  const [loadingText, setLoadingText] = useState("Initializing neural networks...");
  const texts = [
    "Analyzing diverse psychological profiles...",
    "Segmenting emotional triggers...",
    "Optimizing multi-audience messaging...",
    "Synthesizing platform-specific hooks...",
    "Aligning tone for maximum resonance..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full py-20">
      <div className="flex items-center gap-12 mb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-[80px] rounded-full animate-pulse-glow"></div>
        
        {/* Node 1 */}
        <div className="relative w-24 h-24 flex items-center justify-center z-10">
          <div className="absolute w-full h-full border-t-2 border-pink-500 rounded-full animate-spin"></div>
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-pink-500/30">
            <Users className="text-pink-400" size={24} />
          </div>
        </div>

        <div className="w-16 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 relative">
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] animate-[pulse_1s_infinite]"></div>
        </div>

        {/* Central Core */}
        <div className="relative w-32 h-32 flex items-center justify-center z-10">
          <div className="absolute w-[140%] h-[140%] bg-purple-500/20 rounded-full animate-pulse"></div>
          <div className="absolute w-full h-full border-t-2 border-purple-500 rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute w-[80%] h-[80%] border-r-2 border-purple-400 rounded-full animate-[spin_2s_linear_infinite_reverse]"></div>
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center border border-purple-500/50 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
            <BrainCircuit className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="w-16 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 relative">
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-4 h-4 bg-white rounded-full blur-[2px] animate-[pulse_1s_infinite]" style={{ animationDelay: '0.5s' }}></div>
        </div>

        {/* Node 2 */}
        <div className="relative w-24 h-24 flex items-center justify-center z-10">
          <div className="absolute w-full h-full border-t-2 border-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
          <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center border border-blue-500/30">
            <Target className="text-blue-400" size={24} />
          </div>
        </div>
      </div>
      
      <div className="text-center z-10">
        <h3 className="text-2xl font-display font-bold mb-3 text-white">Parallel Cognitive Processing</h3>
        <p className="text-purple-400 font-mono text-sm flex items-center justify-center gap-2">
          {loadingText} <span className="inline-block w-1.5 h-4 bg-purple-400 animate-pulse"></span>
        </p>
      </div>
    </div>
  );
};

const SocialMockup = ({ data, platform, color }) => {
  return (
    <div className="bg-[#050b14] border border-white/5 rounded-2xl overflow-hidden shadow-xl w-full mb-6 relative group">
      {/* Dynamic Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 blur-[50px] opacity-20 rounded-full transition-colors ${color.bgGlow}`}></div>
      
      {/* Mock Header */}
      <div className="p-3 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-[10px] text-white">BR</div>
          <div>
            <div className="font-bold text-[10px] leading-tight text-white">SmartGen Brand</div>
            <div className="text-[8px] text-slate-500 uppercase tracking-widest">{platform}</div>
          </div>
        </div>
        <MoreHorizontal size={14} className="text-slate-500" />
      </div>
      
      {/* Mock Content */}
      <div className="p-4 relative z-10">
        <p className="text-sm text-slate-200 mb-3 leading-relaxed">{data.caption}</p>
        <div className={`text-xs flex flex-wrap gap-1 mb-4 ${color.text}`}>
          {data.hashtags?.map((tag, i) => <span key={i}>{tag}</span>)}
        </div>
        
        {/* Mock Ad Card */}
        <div className={`w-full bg-gradient-to-br ${color.cardGradient} rounded-xl aspect-[16/9] flex flex-col items-center justify-center p-6 text-center border border-white/5 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <h2 className="text-lg md:text-xl font-display font-bold text-white relative z-10 drop-shadow-md">"{data.slogan}"</h2>
          <div className="mt-4 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-bold text-white uppercase tracking-widest relative z-10">
            {data.cta}
          </div>
        </div>
      </div>
      
      {/* Mock Footer */}
      <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
        <div className="flex gap-3 text-slate-500">
          <Heart size={16} className={`hover:${color.text} cursor-pointer transition-colors`} />
          <MessageCircle size={16} className={`hover:text-white cursor-pointer transition-colors`} />
          <Share2 size={16} className={`hover:text-white cursor-pointer transition-colors`} />
        </div>
      </div>
    </div>
  );
};

export default function AudienceComparison() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    brandTone: 'Professional',
    platform: 'Instagram',
    language: 'English'
  });

  const [audiences, setAudiences] = useState(['Gen Z', 'Professionals']);

  const addAudience = () => {
    if (audiences.length < 4) {
      setAudiences([...audiences, 'New Audience']);
    }
  };

  const removeAudience = (index) => {
    if (audiences.length > 2) {
      const newArr = [...audiences];
      newArr.splice(index, 1);
      setAudiences(newArr);
    }
  };

  const updateAudience = (index, val) => {
    const newArr = [...audiences];
    newArr[index] = val;
    setAudiences(newArr);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!formData.productName || !formData.productDescription) return alert("Please fill out product details.");
    
    setIsGenerating(true);
    setResult(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/generate-comparison`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, audiences })
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Failed to generate:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const themeColors = [
    { text: 'text-pink-400', border: 'border-pink-500/30', bgGlow: 'bg-pink-500', cardGradient: 'from-pink-600 to-rose-900', bar: 'bg-pink-500' },
    { text: 'text-blue-400', border: 'border-blue-500/30', bgGlow: 'bg-blue-500', cardGradient: 'from-blue-600 to-cyan-900', bar: 'bg-blue-500' },
    { text: 'text-emerald-400', border: 'border-emerald-500/30', bgGlow: 'bg-emerald-500', cardGradient: 'from-emerald-600 to-teal-900', bar: 'bg-emerald-500' },
    { text: 'text-amber-400', border: 'border-amber-500/30', bgGlow: 'bg-amber-500', cardGradient: 'from-amber-600 to-orange-900', bar: 'bg-amber-500' },
  ];

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] relative overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/30 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="p-8 pb-4 relative z-20 flex-shrink-0 border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl flex justify-between items-end">
        <div>
          <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-white flex items-center gap-3">
            <Users className="text-purple-400"/> Audience Comparison
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl">Witness AI intelligently adapt psychology and tone for multiple demographics simultaneously.</p>
        </div>
        {result && (
          <button 
            onClick={() => setResult(null)}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all"
          >
            New Comparison
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-8 relative z-10 no-scrollbar">
        {!result && !isGenerating ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto glass-panel p-8 rounded-3xl border border-white/5 shadow-2xl relative overflow-hidden"
          >
            {/* Form Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8 flex items-center gap-2">
              <Sparkles size={16} className="text-purple-400" /> Comparison Parameters
            </h2>
            
            <form onSubmit={handleGenerate} className="space-y-8 relative z-10">
              
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
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  >
                    {['Instagram', 'LinkedIn', 'TikTok', 'Facebook'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <label className="absolute text-sm text-purple-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4">
                    Target Platform
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

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center justify-between">
                  Target Audiences (Max 4)
                  {audiences.length < 4 && (
                    <button type="button" onClick={addAudience} className="flex items-center gap-1 text-purple-400 hover:text-purple-300">
                      <Plus size={14}/> Add Audience
                    </button>
                  )}
                </label>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <AnimatePresence>
                    {audiences.map((aud, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="relative"
                      >
                        <div className={`absolute top-0 left-0 w-1 h-full rounded-l-xl ${themeColors[index].bgGlow}`}></div>
                        <input
                          type="text"
                          value={aud}
                          onChange={(e) => updateAudience(index, e.target.value)}
                          className={`w-full bg-[#050b14] border border-white/5 rounded-xl pl-6 pr-10 py-4 text-white font-medium focus:outline-none focus:border-white/20 shadow-inner`}
                        />
                        {audiences.length > 2 && (
                          <button 
                            type="button" 
                            onClick={() => removeAudience(index)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-red-400 transition-colors"
                          >
                            <X size={16}/>
                          </button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full relative group overflow-hidden rounded-xl mt-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shine_1.5s] pointer-events-none"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold py-5 px-6 transition-all text-lg">
                  <BrainCircuit size={20}/> Generate Multi-Audience Strategy
                </div>
              </button>
            </form>
          </motion.div>
        ) : isGenerating ? (
          <MultiAILoadingOrb />
        ) : result?.comparisons ? (
          <div className={`grid gap-6 h-full ${
            result.comparisons.length === 2 ? 'lg:grid-cols-2 max-w-5xl' : 
            result.comparisons.length === 3 ? 'lg:grid-cols-3 max-w-7xl' : 
            'lg:grid-cols-4 max-w-full'
          } mx-auto items-stretch`}>
            
            {result.comparisons.map((comp, index) => {
              const theme = themeColors[index % themeColors.length];
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                  className={`flex flex-col h-full bg-[#050b14]/50 border ${theme.border} rounded-3xl p-6 relative overflow-hidden group hover:bg-[#0b0f19] transition-colors shadow-2xl`}
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 ${theme.bgGlow} blur-[100px] opacity-5 group-hover:opacity-10 transition-opacity rounded-full pointer-events-none`}></div>
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className={`px-4 py-1.5 rounded-full bg-white/5 border border-white/10 ${theme.text} text-xs font-bold tracking-widest uppercase backdrop-blur-md`}>
                      {comp.audience}
                    </div>
                    <div className={`text-xs font-bold ${theme.text} bg-white/5 px-3 py-1 rounded-full border border-white/5`}>
                      {comp.emotionalTone}
                    </div>
                  </div>
                  
                  {/* Social Preview */}
                  <SocialMockup data={comp} platform={formData.platform} color={theme} />
                  
                  {/* Analytics Section */}
                  <div className="mt-4 mb-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2"><BarChart3 size={12}/> Predictives</div>
                      <div className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded">Score: {comp.engagementScore}</div>
                    </div>
                    
                    <div className="space-y-3">
                      {Object.entries(comp.emotionalAnalysis || {}).map(([key, val], i) => (
                        <div key={i}>
                          <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold text-slate-400 mb-1">
                            <span>{key}</span>
                            <span className="text-white">{val}%</span>
                          </div>
                          <div className="w-full bg-slate-800/50 rounded-full h-1">
                            <motion.div 
                              initial={{ width: 0 }} animate={{ width: `${val}%` }} transition={{ duration: 1, delay: 0.5 + (index * 0.2) }}
                              className={`${theme.bar} h-full rounded-full shadow-[0_0_10px_currentColor]`}
                            ></motion.div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Psychology Insight */}
                  <div className="mt-auto pt-5 border-t border-white/5 relative z-10">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                      <BrainCircuit size={12}/> AI Strategic Insight
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      "{comp.psychologyInsight}"
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-red-400">
            <p>Error generating. Please ensure the backend returned the correct array structure.</p>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          100% { left: 125%; }
        }
      `}} />
    </div>
  );
}
