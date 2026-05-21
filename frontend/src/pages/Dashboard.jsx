import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Copy, Loader2, Check, BarChart3, Presentation, Play, Bookmark, Image as ImageIcon, LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
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
  };

  return (
    <div className="flex h-full w-full">
      {/* Center Workspace (Form & Output) */}
      <div className="flex-1 p-8 overflow-y-auto flex flex-col relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Campaign Generator</h1>
            <p className="text-slate-400">Fill in the details to generate a highly personalized campaign.</p>
          </div>
          {result && (
            <div className="flex gap-3">
              <button 
                onClick={handleSaveCampaign}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
                title="Save to Workspace"
              >
                <Bookmark size={18} /> Save
              </button>
              <button 
                onClick={() => navigate('/dashboard/poster', { state: { prompt: result.slogan + " " + result.adCopy } })}
                className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-600 transition-colors"
                title="Generate Poster"
              >
                <ImageIcon size={18} /> Poster
              </button>
              <button 
                onClick={() => navigate('/presentation', { state: { presentationData: result } })}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors shadow-[0_0_15px_rgba(147,51,234,0.3)]"
              >
                <Presentation size={18} /> Presentation Mode
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Input Form */}
          <div className="glassmorphism p-6 rounded-2xl border-slate-700/50 relative z-10">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Sparkles size={20} className="text-purple-400"/> Input Details</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Product Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  value={formData.productName}
                  onChange={(e) => setFormData({...formData, productName: e.target.value})}
                  placeholder="e.g. SmartFit Tracker"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-1">Product Description</label>
                <textarea 
                  required
                  rows="3"
                  className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  value={formData.productDescription}
                  onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                  placeholder="Describe what your product does..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                  <select 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {['Technology', 'Food', 'Fashion', 'Fitness', 'Education', 'Beauty', 'Travel', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Audience</label>
                  <select 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    value={formData.audience}
                    onChange={(e) => setFormData({...formData, audience: e.target.value})}
                  >
                    {['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Luxury Customers', 'Entrepreneurs', 'Gen Z'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Brand Style</label>
                  <select 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    value={formData.brandStyle}
                    onChange={(e) => setFormData({...formData, brandStyle: e.target.value})}
                  >
                    {['Apple-style', 'Nike-style', 'Tesla-style', 'Starbucks-style', 'Startup-style', 'Luxury Premium'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Platform</label>
                  <select 
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500"
                    value={formData.platform}
                    onChange={(e) => setFormData({...formData, platform: e.target.value})}
                  >
                    {['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Email Campaign'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isGenerating}
                className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
              >
                {isGenerating ? <><Loader2 className="animate-spin" size={20} /> Generating AI Campaign...</> : <><Play size={20} /> Generate Campaign</>}
              </button>
            </form>
          </div>

          {/* Generated Outputs */}
          <div className="relative z-10 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {isGenerating ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center glassmorphism rounded-2xl border-slate-700 p-8 text-center"
                >
                  <div className="relative w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-t-2 border-purple-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-r-2 border-blue-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    <Sparkles className="absolute inset-0 m-auto text-purple-400 animate-pulse" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Analyzing Audience Psychology...</h3>
                  <p className="text-slate-400 max-w-sm">Crafting personalized messaging for {formData.audience} using {formData.brandStyle}.</p>
                </motion.div>
              ) : result ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  {/* Slogan */}
                  <div className="glassmorphism rounded-2xl p-6 neon-border group relative">
                    <button onClick={() => handleCopy(result.slogan)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Copy size={16}/></button>
                    <div className="text-xs uppercase font-bold tracking-wider text-purple-400 mb-2">Campaign Slogan</div>
                    <div className="text-3xl font-extrabold leading-tight">"{result.slogan}"</div>
                  </div>

                  {/* Ad Copy */}
                  <div className="glassmorphism rounded-2xl p-6 border-slate-700 group relative">
                    <button onClick={() => handleCopy(result.adCopy)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"><Copy size={16}/></button>
                    <div className="text-xs uppercase font-bold tracking-wider text-blue-400 mb-2">Ad Copy</div>
                    <div className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">{result.adCopy}</div>
                  </div>

                  {/* Caption & Hashtags */}
                  <div className="glassmorphism rounded-2xl p-6 border-slate-700">
                    <div className="text-xs uppercase font-bold tracking-wider text-pink-400 mb-2">Social Caption</div>
                    <div className="text-md text-slate-300 mb-4">{result.caption}</div>
                    <div className="flex flex-wrap gap-2">
                      {result.hashtags?.map((tag, i) => (
                        <span key={i} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-700 transition-colors cursor-pointer">{tag}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center glassmorphism rounded-2xl border-slate-700/50 p-8 text-center text-slate-500 opacity-50">
                  <LayoutDashboard size={48} className="mb-4 text-slate-600" />
                  <p>Your generated campaign will appear here.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Analytics Panel */}
      <div className="w-80 glassmorphism border-l border-slate-700/50 z-20 flex flex-col">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-bold flex items-center gap-2"><BarChart3 size={20} className="text-blue-400"/> AI Campaign Analytics</h2>
        </div>
        
        <div className="flex-1 p-6 overflow-y-auto space-y-8">
          {result ? (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              {/* Overall Score */}
              <div className="mb-8 text-center">
                <div className="relative inline-flex items-center justify-center">
                  <svg className="w-32 h-32 transform -rotate-90">
                    <circle className="text-slate-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                    <circle className="text-purple-500 shadow-[0_0_10px_purple]" strokeWidth="8" strokeDasharray={364} strokeDashoffset={364 - (364 * result.campaignScore?.quality) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="58" cx="64" cy="64" />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold">{result.campaignScore?.quality}</span>
                    <span className="text-xs text-slate-400">Score</span>
                  </div>
                </div>
                <div className="mt-2 font-semibold text-slate-300">Overall Quality</div>
              </div>

              {/* Sub Scores */}
              <div className="space-y-4 mb-8">
                {[
                  { label: "Emotional Impact", value: result.campaignScore?.emotionalImpact, color: "bg-pink-500" },
                  { label: "Creativity", value: result.campaignScore?.creativity, color: "bg-purple-500" },
                  { label: "Audience Match", value: result.campaignScore?.audienceMatch, color: "bg-blue-500" }
                ].map((score, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">{score.label}</span>
                      <span className="font-bold">{score.value}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className={`${score.color} h-2 rounded-full`} style={{ width: `${score.value}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Emotional Analysis */}
              <div className="glassmorphism p-4 rounded-xl border-slate-700 mb-6">
                <div className="text-xs uppercase font-bold text-slate-500 mb-3 tracking-wider">Psychology Insights</div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-slate-400">Trust Level</div>
                    <div className="font-bold text-green-400">{result.emotionalAnalysis?.trustLevel}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Excitement</div>
                    <div className="font-bold text-orange-400">{result.emotionalAnalysis?.excitementLevel}%</div>
                  </div>
                </div>
              </div>

              {/* Strategy Insight */}
              <div>
                <div className="text-xs uppercase font-bold text-slate-500 mb-2 tracking-wider">Strategy Insight</div>
                <p className="text-sm text-slate-300 italic">"{result.strategyInsight}"</p>
              </div>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50 text-center">
              <BarChart3 size={40} className="mb-4" />
              <p className="text-sm">Generate a campaign to view AI analytics and audience psychology insights.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
