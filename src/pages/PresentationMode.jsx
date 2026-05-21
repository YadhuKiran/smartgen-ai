import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Maximize, X, Sparkles, Target, Activity } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PresentationMode() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.presentationData;
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!result) {
      navigate('/dashboard');
    }
  }, [result, navigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setCurrentSlide(s => Math.min(s + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlide(s => Math.max(s - 1, 0));
      } else if (e.key === 'Escape') {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!result) return null;

  const slides = [
    // Slide 1: Title & Hero Slogan
    {
      id: 'slogan',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center max-w-6xl mx-auto px-12">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}
            className="text-sm font-bold text-purple-400 tracking-[0.3em] uppercase mb-12 flex items-center gap-3"
          >
            <Sparkles size={16}/> Generated Campaign Slogan
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-6xl md:text-8xl font-display font-extrabold text-white leading-tight mb-16 tracking-tight drop-shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            "{result.slogan}"
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.5 }}
            className="flex gap-4"
          >
            <span className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md">Emotion: Excitement</span>
            <span className="px-6 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 backdrop-blur-md">Tone: Persuasive</span>
          </motion.div>
        </div>
      ),
      background: 'bg-gradient-to-br from-[#030712] via-[#0b0f19] to-purple-950/20',
      blob: 'bg-purple-600/20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] blur-[150px]'
    },
    // Slide 2: Ad Copy
    {
      id: 'copy',
      content: (
        <div className="flex flex-col justify-center h-full max-w-5xl mx-auto px-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-sm font-bold text-blue-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
              <Target size={16}/> The Pitch
            </div>
            <h2 className="text-4xl font-display font-bold text-white">Targeted Long-form Copy</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.4 }}
            className="text-2xl md:text-4xl text-slate-300 leading-relaxed font-light whitespace-pre-wrap border-l-4 border-blue-500 pl-8 py-4"
          >
            {result.adCopy}
          </motion.div>
        </div>
      ),
      background: 'bg-[#030712]',
      blob: 'bg-blue-600/10 right-0 top-0 w-[50vw] h-[50vw] blur-[150px]'
    },
    // Slide 3: Analytics & Strategy
    {
      id: 'analytics',
      content: (
        <div className="flex flex-col justify-center h-full max-w-6xl mx-auto px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="text-sm font-bold text-pink-400 tracking-[0.3em] uppercase mb-4 flex items-center gap-3">
                <Activity size={16}/> Campaign Telemetry
              </div>
              <h2 className="text-5xl font-display font-bold text-white mb-8">AI Strategy Insights</h2>
              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-xl mb-8">
                <p className="text-xl text-slate-300 leading-relaxed italic">"{result.strategyInsight}"</p>
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-bold">Platform</div>
                  <div className="text-2xl text-white font-display">Social Media</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 uppercase tracking-widest mb-2 font-bold">Hashtags</div>
                  <div className="text-lg text-purple-400 flex flex-wrap gap-2">
                    {result.hashtags?.slice(0,4).map((t,i)=><span key={i}>{t}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
              className="flex justify-center"
            >
              <div className="relative">
                <svg className="w-80 h-80 transform -rotate-90">
                  <circle className="text-slate-800" strokeWidth="8" stroke="currentColor" fill="transparent" r="150" cx="160" cy="160" />
                  <circle className="text-pink-500 shadow-[0_0_30px_#ec4899]" strokeWidth="8" strokeDasharray={942} strokeDashoffset={942 - (942 * (result.campaignScore?.quality || 95)) / 100} strokeLinecap="round" stroke="currentColor" fill="transparent" r="150" cx="160" cy="160" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-7xl font-display font-extrabold text-white">{result.campaignScore?.quality || 95}</span>
                  <span className="text-sm text-pink-400 font-bold uppercase tracking-widest mt-2">Predicted Quality</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      ),
      background: 'bg-[#030712]',
      blob: 'bg-pink-600/10 left-0 bottom-0 w-[60vw] h-[60vw] blur-[150px]'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black text-white font-sans selection:bg-purple-500/30">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`absolute inset-0 ${slides[currentSlide].background} flex items-center justify-center`}
        >
          {/* Ambient Blob */}
          <div className={`absolute rounded-full pointer-events-none transition-all duration-1000 ${slides[currentSlide].blob}`}></div>
          
          {/* Subtle Grain */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none"></div>

          {/* Slide Content */}
          <div className="relative z-10 w-full h-full">
            {slides[currentSlide].content}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls Overlay */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-6 py-3 rounded-full glass-panel border border-white/10 z-50">
        <button 
          onClick={() => setCurrentSlide(s => Math.max(s - 1, 0))}
          disabled={currentSlide === 0}
          className="text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-white w-6' : 'bg-white/20'}`}
            ></div>
          ))}
        </div>

        <button 
          onClick={() => setCurrentSlide(s => Math.min(s + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1}
          className="text-slate-400 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Top Right Actions */}
      <div className="absolute top-8 right-8 flex gap-4 z-50">
        <button 
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(err => console.log(err));
            } else {
              document.exitFullscreen();
            }
          }}
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md transition-all text-slate-300 hover:text-white"
        >
          <Maximize size={20} />
        </button>
        <button 
          onClick={() => navigate(-1)}
          className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center backdrop-blur-md transition-all text-slate-300 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  );
}
