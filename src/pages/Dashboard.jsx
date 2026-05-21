import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Bookmark, Image as ImageIcon, LayoutDashboard, Copy, Check, Heart, MessageCircle, Share2, MoreHorizontal, BrainCircuit, Activity, BarChart3, TrendingUp, ThumbsUp, Send, Repeat2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AILoadingOrb = () => {
  const [stage, setStage] = useState(0);
  
  const stages = [
    { title: "Initializing Neural Core", desc: "Booting cognitive models...", progress: 10 },
    { title: "Psychological Profiling", desc: "Analyzing audience emotional triggers...", progress: 35 },
    { title: "Strategic Alignment", desc: "Calibrating brand tone and platform constraints...", progress: 60 },
    { title: "Copy Synthesis", desc: "Generating high-conversion hooks...", progress: 85 },
    { title: "Final Polish", desc: "Optimizing engagement predictives...", progress: 95 }
  ];

  useEffect(() => {
    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage++;
      if (currentStage < stages.length) {
        setStage(currentStage);
      }
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto">
      <div className="relative w-48 h-48 flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full animate-[pulse-glow_3s_infinite]"></div>
        <div className="absolute w-32 h-32 bg-gradient-to-tr from-purple-600 via-pink-500 to-blue-500 rounded-full blur-[15px] animate-[aurora-rotate_8s_linear_infinite]"></div>
        
        {/* Core Node */}
        <div className="absolute w-24 h-24 bg-slate-950 rounded-full border border-white/10 shadow-[inset_0_0_30px_rgba(168,85,247,0.3)] flex items-center justify-center z-20">
          <BrainCircuit className="text-purple-400 animate-pulse" size={36} />
        </div>
        
        {/* Orbiting Elements */}
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-full h-full opacity-60 z-10">
          <div className="absolute top-0 left-1/2 w-3 h-3 bg-pink-400 rounded-full shadow-[0_0_15px_#f472b6]"></div>
          <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]"></div>
        </motion.div>

        {/* Data Rings */}
        <svg className="absolute w-[130%] h-[130%] animate-[spin_15s_linear_infinite] opacity-40 text-purple-500/50">
          <circle cx="125" cy="125" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
        </svg>
        <svg className="absolute w-[150%] h-[150%] animate-[spin_20s_linear_infinite_reverse] opacity-20 text-blue-500/50">
          <circle cx="144" cy="144" r="140" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 40" />
        </svg>
      </div>

      <div className="w-full relative z-10">
        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          <span>{stages[stage].title}</span>
          <span className="text-purple-400">{stages[stage].progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-800/50 rounded-full overflow-hidden mb-4">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${stages[stage].progress}%` }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 shadow-[0_0_10px_purple]"
          ></motion.div>
        </div>
        <p className="text-slate-500 font-mono text-xs text-center flex justify-center items-center gap-2 h-6">
          {stages[stage].desc} <span className="inline-block w-1.5 h-3 bg-purple-400 animate-pulse"></span>
        </p>
      </div>
    </div>
  );
};

const SocialMockup = ({ result, platform }) => {
  const isIG = platform === 'Instagram';
  const isLI = platform === 'LinkedIn';
  const isTK = platform === 'TikTok';

  if (isIG) {
    return (
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto font-sans">
        {/* IG Header */}
        <div className="p-3 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 p-[2px]">
              <div className="w-full h-full bg-black rounded-full border-2 border-black flex items-center justify-center text-[8px] font-bold">SG</div>
            </div>
            <div className="font-bold text-xs text-white">smartgen_ai</div>
          </div>
          <MoreHorizontal size={18} className="text-slate-400" />
        </div>
        
        {/* IG Image Area */}
        <div className="w-full aspect-square bg-gradient-to-br from-slate-800 to-slate-900 relative group overflow-hidden flex flex-col items-center justify-center p-6 text-center border-y border-white/5">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
          <h2 className="text-3xl font-display font-extrabold text-white relative z-10 drop-shadow-2xl">{result.slogan}</h2>
        </div>

        {/* IG Actions */}
        <div className="p-3">
          <div className="flex justify-between items-center mb-2">
            <div className="flex gap-4">
              <Heart size={22} className="text-slate-200" />
              <MessageCircle size={22} className="text-slate-200" />
              <Send size={22} className="text-slate-200" />
            </div>
            <Bookmark size={22} className="text-slate-200" />
          </div>
          <div className="text-xs font-bold text-white mb-2">1,245 likes</div>
          <p className="text-sm text-slate-200 leading-snug">
            <span className="font-bold mr-2">smartgen_ai</span>
            {result.caption}
          </p>
          <div className="text-xs text-blue-400 mt-2 flex flex-wrap gap-1">
            {result.hashtags?.map((tag, i) => <span key={i}>{tag}</span>)}
          </div>
        </div>
      </motion.div>
    );
  }

  if (isLI) {
    return (
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-[#0b0f19] border border-white/10 rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto font-sans">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-md bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">SG</div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-1">SmartGen Technologies <Check size={12} className="text-slate-400 bg-slate-700 rounded-full p-[1px]"/></div>
              <div className="text-xs text-slate-500">10,492 followers</div>
              <div className="text-[10px] text-slate-500 flex items-center gap-1">Promoted <div className="w-1 h-1 bg-slate-600 rounded-full"></div> 1w</div>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">{result.caption}</p>
        </div>
        
        <div className="w-full aspect-[1.91/1] bg-gradient-to-br from-slate-800 to-slate-950 flex flex-col items-center justify-center p-8 text-center relative border-b border-white/5">
          <h2 className="text-2xl font-display font-bold text-white relative z-10">{result.slogan}</h2>
        </div>
        
        <div className="bg-[#0f1420] px-4 py-3 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-400 uppercase tracking-widest">smartgen.ai</div>
            <div className="text-sm font-bold text-white">Learn how we adapt to your workflow.</div>
          </div>
          <button className="px-4 py-1.5 border border-blue-500 text-blue-400 rounded-full text-sm font-bold hover:bg-blue-500/10 transition-colors">
            {result.cta || "Learn More"}
          </button>
        </div>
        
        <div className="px-4 py-2 border-t border-white/5 flex justify-between items-center text-slate-400 text-xs font-bold">
          <div className="flex items-center gap-1 hover:bg-white/5 px-2 py-2 rounded transition-colors cursor-pointer"><ThumbsUp size={16} /> Like</div>
          <div className="flex items-center gap-1 hover:bg-white/5 px-2 py-2 rounded transition-colors cursor-pointer"><MessageCircle size={16} /> Comment</div>
          <div className="flex items-center gap-1 hover:bg-white/5 px-2 py-2 rounded transition-colors cursor-pointer"><Repeat2 size={16} /> Repost</div>
        </div>
      </motion.div>
    );
  }

  // Generic / Default
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
      <div className="p-4 border-b border-white/5 flex items-center gap-3 bg-white/[0.02]">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500"></div>
        <div>
          <div className="font-bold text-xs text-white">SmartGen Platform</div>
          <div className="text-[10px] text-slate-500 uppercase tracking-widest">{platform} Ad</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm text-slate-200 mb-4 leading-relaxed">{result.caption}</p>
        <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-[16/9] flex items-center justify-center p-6 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <h2 className="text-xl font-display font-bold text-white relative z-10">"{result.slogan}"</h2>
        </div>
      </div>
    </motion.div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    category: 'Technology',
    audience: 'Professionals',
    brandTone: 'Professional',
    brandStyle: 'Apple-style',
    platform: 'Instagram',
    language: 'English'
  });

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    setResult(null);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/generate-campaign`, {
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

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="flex h-full w-full bg-[#030712] relative overflow-hidden">
      
      {/* Ambient Continuous Motion */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[150px] rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 blur-[150px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Center Workspace */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col relative no-scrollbar z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-white tracking-tight">Campaign Studio</h1>
            <p className="text-slate-400 text-sm">Configure parameters to generate an emotionally optimized campaign.</p>
          </div>
          {result && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-3">
              <button 
                onClick={() => navigate('/dashboard/poster', { state: { prompt: result.slogan + " " + result.adCopy } })}
                className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-xl border border-white/5 transition-all text-sm font-medium"
              >
                <ImageIcon size={16} className="text-blue-400" /> Poster Studio
              </button>
              <button 
                onClick={() => navigate('/presentation', { state: { presentationData: result } })}
                className="group relative inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:scale-105"
              >
                <Play size={16} className="fill-white" /> Present
              </button>
            </motion.div>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 mb-8 flex-1 items-start">
          
          {/* Form Panel */}
          <div className="glass-panel p-6 lg:p-8 rounded-3xl relative flex flex-col shadow-2xl border border-white/5">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div> Input Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" required
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer"
                    value={formData.productName} onChange={(e) => setFormData({...formData, productName: e.target.value})} placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400">
                    Product Name
                  </label>
                </div>
                <div className="relative group">
                  <textarea 
                    required rows="3"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer resize-none"
                    value={formData.productDescription} onChange={(e) => setFormData({...formData, productDescription: e.target.value})} placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400">
                    Product Description
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Audience</label>
                  <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none" value={formData.audience} onChange={(e) => setFormData({...formData, audience: e.target.value})}>
                    {['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Gen Z'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Platform</label>
                  <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none" value={formData.platform} onChange={(e) => setFormData({...formData, platform: e.target.value})}>
                    {['Instagram', 'LinkedIn', 'TikTok', 'Facebook'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-purple-400 uppercase tracking-wider pl-1 flex items-center gap-2">
                  <Sparkles size={12} /> Inspiration Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Apple-style', 'Nike-style', 'Tesla-style', 'Startup-style', 'Luxury Premium', 'Minimal'].map(style => (
                    <button
                      key={style} type="button" onClick={() => setFormData({...formData, brandStyle: style})}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${formData.brandStyle === style ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'}`}
                    >
                      {style.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button type="submit" disabled={isGenerating} className="w-full relative group overflow-hidden rounded-xl mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold py-4 px-6 transition-all disabled:opacity-50">
                  {isGenerating ? 'Synthesizing...' : 'Generate Neural Campaign'}
                </div>
              </button>
            </form>
          </div>

          {/* Cinematic Output Area */}
          <div className="relative flex flex-col h-full min-h-[600px] bg-[#050b14]/50 border border-white/5 rounded-3xl p-8 shadow-2xl">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex items-center justify-center">
                  <AILoadingOrb />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col h-full"
                >
                  <motion.div variants={itemVariants} className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2"><CheckCircle2 className="text-green-400"/> Synthesis Complete</h3>
                    <button onClick={() => handleCopy(result.adCopy)} className="text-xs font-bold text-slate-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                      {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>} {copied ? 'Copied' : 'Copy Text'}
                    </button>
                  </motion.div>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
                    {/* Platform Specific Social Mockup */}
                    <SocialMockup result={result} platform={formData.platform} />
                    
                    {/* Cinematic Ad Copy Box */}
                    <motion.div variants={itemVariants} className="bg-[#0b0f19] border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
                      <div className="absolute -right-16 -top-16 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-700"></div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2"><Sparkles size={12}/> Expanded Copy</div>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap relative z-10">{result.adCopy}</p>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-center">
                  <div className="w-20 h-20 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                    <BrainCircuit size={32} className="text-slate-500 opacity-50" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-400 mb-2">System Standing By</h3>
                  <p className="text-sm max-w-xs">Awaiting input parameters to begin psychological profiling and synthesis.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Analytics Panel */}
      <div className="w-80 bg-[#050b14] border-l border-white/5 z-20 flex flex-col shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} className="text-blue-400"/> Live Telemetry
          </h2>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto no-scrollbar">
          {result ? (
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
              
              {/* Overall Quality Ring */}
              <motion.div variants={itemVariants} className="mb-10 text-center relative mt-4">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-purple-500/20 blur-[40px] rounded-full animate-pulse-glow"></div>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-40 h-40 transform -rotate-90 drop-shadow-2xl">
                    <circle className="text-slate-800" strokeWidth="4" stroke="currentColor" fill="transparent" r="72" cx="80" cy="80" />
                    <motion.circle 
                      initial={{ strokeDashoffset: 452 }} animate={{ strokeDashoffset: 452 - (452 * result.campaignScore?.quality) / 100 }} transition={{ duration: 1.5, ease: "easeOut" }}
                      className="text-purple-500 shadow-[0_0_20px_purple]" strokeWidth="4" strokeDasharray={452} strokeLinecap="round" stroke="currentColor" fill="transparent" r="72" cx="80" cy="80" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-5xl font-display font-extrabold text-white">{result.campaignScore?.quality}</span>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Impact Score</span>
                  </div>
                </div>
              </motion.div>

              {/* Advanced Sub Scores */}
              <motion.div variants={itemVariants} className="space-y-6 mb-10">
                {[
                  { label: "Emotional Resonance", value: result.campaignScore?.emotionalImpact, color: "from-pink-500 to-rose-400" },
                  { label: "Creative Divergence", value: result.campaignScore?.creativity, color: "from-purple-500 to-indigo-400" },
                  { label: "Audience Alignment", value: result.campaignScore?.audienceMatch, color: "from-blue-500 to-cyan-400" }
                ].map((score, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-wider">
                      <span className="text-slate-400">{score.label}</span>
                      <span className="text-white">{score.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${score.value}%` }} transition={{ duration: 1.2, delay: 0.5 + (idx * 0.1) }}
                        className={`h-full bg-gradient-to-r ${score.color} rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Psychology Breakdown */}
              <motion.div variants={itemVariants} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-[30px] rounded-full"></div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Psychological Profile</div>
                <div className="grid grid-cols-2 gap-6 relative z-10">
                  <div>
                    <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Trust Factor</div>
                    <div className="text-2xl font-display font-bold text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">{result.emotionalAnalysis?.trustLevel}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider">Excitement</div>
                    <div className="text-2xl font-display font-bold text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">{result.emotionalAnalysis?.excitementLevel}%</div>
                  </div>
                </div>
              </motion.div>

              {/* Strategy Insight */}
              <motion.div variants={itemVariants} className="relative">
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-purple-500 to-blue-500 rounded-full"></div>
                <div className="pl-4 py-1">
                  <div className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <BrainCircuit size={12} /> Strategic Commentary
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic">{result.strategyInsight}</p>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
              <TrendingUp size={32} className="mb-4 opacity-30" />
              <p className="text-xs font-medium uppercase tracking-widest">Awaiting Telemetry</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
