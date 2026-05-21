import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Play, Bookmark, Image as ImageIcon, LayoutDashboard, Copy, Check, Heart, MessageCircle, Share2, MoreHorizontal, BrainCircuit, Activity, BarChart3, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AILoadingOrb = () => {
  const [loadingText, setLoadingText] = useState("Initializing neural networks...");
  const texts = [
    "Analyzing audience psychology...",
    "Optimizing emotional hooks...",
    "Generating high-conversion copy...",
    "Refining brand voice...",
    "Predicting engagement metrics..."
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % texts.length;
      setLoadingText(texts[i]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="relative w-40 h-40 flex items-center justify-center mb-12">
        <div className="absolute inset-0 bg-purple-500/20 blur-[50px] rounded-full animate-pulse-glow"></div>
        <div className="absolute w-24 h-24 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-full blur-[10px] animate-aurora"></div>
        <div className="absolute w-20 h-20 bg-slate-900 rounded-full border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center z-10">
          <BrainCircuit className="text-purple-400 animate-pulse" size={32} />
        </div>
        <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite] opacity-50 text-purple-500/30">
          <circle cx="80" cy="80" r="78" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
        </svg>
        <svg className="absolute w-[120%] h-[120%] animate-[spin_15s_linear_infinite_reverse] opacity-30 text-blue-500/30">
          <circle cx="96" cy="96" r="94" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10 20" />
        </svg>
      </div>
      <div className="text-center z-10">
        <h3 className="text-2xl font-display font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Synthesizing Campaign</h3>
        <p className="text-slate-400 font-mono text-sm flex items-center justify-center gap-2">
          {loadingText} <span className="inline-block w-1 h-3 bg-purple-400 animate-pulse"></span>
        </p>
      </div>
    </div>
  );
};

const SocialMockup = ({ result, platform }) => {
  return (
    <div className="bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden shadow-2xl max-w-md mx-auto">
      {/* Mock Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-sm">YK</div>
          <div>
            <div className="font-bold text-sm leading-tight text-white">SmartGen Brand</div>
            <div className="text-xs text-slate-500">Sponsored • {platform}</div>
          </div>
        </div>
        <MoreHorizontal size={20} className="text-slate-500" />
      </div>
      
      {/* Mock Content */}
      <div className="p-5">
        <p className="text-sm text-slate-200 mb-4 leading-relaxed whitespace-pre-wrap">{result.caption}</p>
        <div className="text-xs text-purple-400 flex flex-wrap gap-1 mb-4">
          {result.hashtags?.map((tag, i) => <span key={i}>{tag}</span>)}
        </div>
        
        {/* Mock Image/Ad Card */}
        <div className="w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-[4/3] flex flex-col items-center justify-center border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md">Image Preview Area</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-white text-center px-6 relative z-0">{result.slogan}</h2>
        </div>
      </div>
      
      {/* Mock Footer */}
      <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex gap-4 text-slate-400">
          <Heart size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
          <MessageCircle size={20} className="hover:text-blue-500 cursor-pointer transition-colors" />
          <Share2 size={20} className="hover:text-green-500 cursor-pointer transition-colors" />
        </div>
        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold transition-colors">
          Learn More
        </button>
      </div>
    </div>
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
    platform: 'LinkedIn',
    language: 'English'
  });

  useEffect(() => {
    const saved = localStorage.getItem('smartgen_settings');
    if (saved) {
      const parsed = JSON.parse(saved);
      setFormData(prev => ({
        ...prev,
        category: parsed.defaultCategory || prev.category,
        audience: parsed.defaultAudience || prev.audience,
        brandStyle: parsed.defaultBrandStyle || prev.brandStyle,
        platform: parsed.defaultPlatform || prev.platform,
        language: parsed.defaultLanguage || prev.language
      }));
    }
  }, []);

  const handleSaveCampaign = () => {
    if (!result) return;
    const campaigns = JSON.parse(localStorage.getItem('smartgen_campaigns') || '[]');
    const newCamp = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      productName: formData.productName,
      category: formData.category,
      platform: formData.platform,
      result: result
    };
    localStorage.setItem('smartgen_campaigns', JSON.stringify([newCamp, ...campaigns]));
    alert('Campaign saved to workspace!');
  };

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

  return (
    <div className="flex h-full w-full">
      {/* Center Workspace (Form & Output) */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col relative no-scrollbar">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-display font-bold mb-2 text-white tracking-tight">Campaign Studio</h1>
            <p className="text-slate-400 text-sm">Configure your parameters to generate AI-optimized marketing assets.</p>
          </div>
          {result && (
            <div className="flex gap-3">
              <button 
                onClick={handleSaveCampaign}
                className="group flex items-center justify-center w-10 h-10 bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white rounded-xl border border-white/5 transition-all"
                title="Save to Workspace"
              >
                <Bookmark size={18} className="group-hover:scale-110 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/dashboard/poster', { state: { prompt: result.slogan + " " + result.adCopy } })}
                className="flex items-center gap-2 px-4 py-2 bg-white/[0.05] hover:bg-white/[0.1] text-white rounded-xl border border-white/5 transition-all text-sm font-medium"
              >
                <ImageIcon size={16} className="text-blue-400" /> Generate Poster
              </button>
              <button 
                onClick={() => navigate('/presentation', { state: { presentationData: result } })}
                className="group relative inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-xl text-sm font-medium transition-all shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_30px_rgba(147,51,234,0.5)]"
              >
                <Play size={16} className="fill-white" /> Present
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 mb-8 flex-1">
          {/* Input Form */}
          <div className="glass-panel p-6 lg:p-8 rounded-3xl relative z-10 flex flex-col h-fit shadow-2xl">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div> Parameters
            </h2>
            <form onSubmit={handleGenerate} className="space-y-5">
              
              <div className="space-y-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    required
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
                  <textarea 
                    required
                    rows="3"
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white focus:outline-none focus:border-purple-500 transition-all peer resize-none"
                    value={formData.productDescription}
                    onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                    placeholder=" "
                  />
                  <label className="absolute text-sm text-slate-500 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-purple-400">
                    Product Description
                  </label>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Audience</label>
                  <select 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                    value={formData.audience}
                    onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  >
                    {['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Luxury Customers', 'Entrepreneurs', 'Gen Z'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider pl-1">Platform</label>
                  <select 
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 appearance-none"
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  >
                    {['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Email Campaign'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-purple-400 uppercase tracking-wider pl-1 flex items-center gap-2">
                  <Sparkles size={12} /> Brand Inspiration Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Apple-style', 'Nike-style', 'Tesla-style', 'Startup-style', 'Luxury Premium', 'Minimal Modern'].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setFormData({...formData, brandStyle: style})}
                      className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                        formData.brandStyle === style 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50' 
                          : 'bg-slate-900/50 text-slate-400 border border-white/5 hover:border-white/20 hover:text-slate-200'
                      }`}
                    >
                      {style.split('-')[0]}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="w-full mt-6 relative group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                {/* Shine effect */}
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shine_1.5s] pointer-events-none"></div>
                <div className="relative flex items-center justify-center gap-2 text-white font-bold py-4 px-6 transition-all disabled:opacity-50">
                  {isGenerating ? 'Initializing...' : 'Generate Campaign'}
                </div>
              </button>
            </form>
          </div>

          {/* Generated Outputs Area */}
          <div className="relative z-10 flex flex-col h-full min-h-[500px] bg-[#050b14]/50 border border-white/5 rounded-3xl p-6">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <AILoadingOrb />
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-display font-bold text-white">Generated Assets</h3>
                    <div className="flex gap-2">
                      <button className="text-xs font-bold text-slate-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors">Raw JSON</button>
                      <button onClick={() => handleCopy(result.adCopy)} className="text-xs font-bold text-slate-400 bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                        {copied ? <Check size={14} className="text-green-400"/> : <Copy size={14}/>} {copied ? 'Copied' : 'Copy All'}
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto no-scrollbar space-y-6 pb-4">
                    {/* Social Media Mockup */}
                    <SocialMockup result={result} platform={formData.platform} />
                    
                    {/* Ad Copy Box */}
                    <div className="bg-[#0b0f19] border border-white/5 rounded-2xl p-5 shadow-lg">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Long-Form Ad Copy</div>
                      <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{result.adCopy}</p>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4">
                    <Sparkles size={24} className="text-slate-500" />
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-400 mb-2">No Campaign Generated</h3>
                  <p className="text-sm max-w-xs">Configure your parameters on the left and click generate to see the AI in action.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Analytics Panel */}
      <div className="w-80 bg-[#050b14] border-l border-white/5 z-20 flex flex-col shadow-2xl relative">
        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Activity size={16} className="text-blue-400"/> Live Telemetry
          </h2>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto no-scrollbar relative">
          {result ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              
              {/* Overall Score with glowing gauge */}
              <div className="mb-10 text-center relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-purple-500/20 blur-[30px] rounded-full"></div>
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-36 h-36 transform -rotate-90 drop-shadow-2xl">
                    <circle className="text-slate-800" strokeWidth="6" stroke="currentColor" fill="transparent" r="66" cx="72" cy="72" />
                    <circle className="text-purple-500 shadow-[0_0_15px_purple]" strokeWidth="6" strokeDasharray={414} strokeDashoffset={414 - (414 * result.campaignScore?.quality) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="66" cx="72" cy="72" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-display font-extrabold text-white">{result.campaignScore?.quality}</span>
                    <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mt-1">Quality</span>
                  </div>
                </div>
              </div>

              {/* Sub Scores */}
              <div className="space-y-5 mb-8">
                {[
                  { label: "Emotional Impact", value: result.campaignScore?.emotionalImpact, color: "bg-pink-500", shadow: "shadow-[0_0_10px_#ec4899]" },
                  { label: "Creativity", value: result.campaignScore?.creativity, color: "bg-purple-500", shadow: "shadow-[0_0_10px_#a855f7]" },
                  { label: "Audience Match", value: result.campaignScore?.audienceMatch, color: "bg-blue-500", shadow: "shadow-[0_0_10px_#3b82f6]" }
                ].map((score, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-slate-400">{score.label}</span>
                      <span className="text-white">{score.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800/50 rounded-full h-1.5 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${score.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                        className={`${score.color} ${score.shadow} h-full rounded-full`}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Psychology Insights Grid */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl mb-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 blur-xl rounded-full"></div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Psychology Profile</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-[10px] text-slate-400 mb-1">Trust Factor</div>
                    <div className="text-xl font-display font-bold text-emerald-400">{result.emotionalAnalysis?.trustLevel}%</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 mb-1">Excitement</div>
                    <div className="text-xl font-display font-bold text-amber-400">{result.emotionalAnalysis?.excitementLevel}%</div>
                  </div>
                </div>
              </div>

              {/* Strategy Insight */}
              <div className="relative">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <BrainCircuit size={12} /> AI Strategy Note
                </div>
                <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20 p-4 rounded-2xl relative">
                  <p className="text-sm text-purple-100/80 leading-relaxed">{result.strategyInsight}</p>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 text-center">
              <TrendingUp size={40} className="mb-4 opacity-50" />
              <h3 className="text-sm font-bold text-slate-400 mb-2">Awaiting Data</h3>
              <p className="text-xs">Analytics will populate once the AI finishes processing.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Required keyframe for the button shine */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shine {
          100% { left: 125%; }
        }
      `}} />
    </div>
  );
}
