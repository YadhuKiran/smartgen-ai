import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, Image as ImageIcon, BarChart, Play, CheckCircle2, XCircle } from 'lucide-react';

// Magnetic Button Component
const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;
  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
      animate={{ x, y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

// Massive Interactive AI Orb Component
const AICoreOrb = ({ mouseX, mouseY }) => {
  // Move the orb slightly based on mouse position
  const x = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  
  const springX = useSpring(x, { stiffness: 50, damping: 20 });
  const springY = useSpring(y, { stiffness: 50, damping: 20 });

  return (
    <motion.div 
      style={{ x: springX, y: springY }}
      className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 mix-blend-screen opacity-80"
    >
      {/* Core Energy */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600 via-blue-500 to-pink-500 rounded-full blur-[80px] animate-pulse-glow"></div>
      
      {/* Inner Plasma */}
      <div className="absolute inset-[20%] bg-gradient-to-br from-white/40 via-purple-400/40 to-blue-400/40 rounded-full blur-[30px] animate-aurora"></div>
      
      {/* Neural Core Rings */}
      <svg className="absolute inset-0 w-full h-full animate-[spin_20s_linear_infinite] opacity-30 text-purple-300">
        <circle cx="300" cy="300" r="280" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 30" />
        <circle cx="300" cy="300" r="240" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 12" />
      </svg>
      <svg className="absolute inset-[-10%] w-[120%] h-[120%] animate-[spin_25s_linear_infinite_reverse] opacity-20 text-blue-400">
        <circle cx="360" cy="360" r="340" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="20 40" />
      </svg>

      {/* Floating Particles around Orb */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40, 0],
            x: [0, (i % 2 === 0 ? 30 : -30), 0],
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff]"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${20 + Math.random() * 60}%`
          }}
        />
      ))}
    </motion.div>
  );
};

const TypingText = ({ text }) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [text]);
  return <span>{displayed}</span>;
};

export default function LandingPage() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  
  // Parallax effects
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] selection:bg-purple-500/30 overflow-hidden font-sans">
      
      {/* Cinematic Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#030712]"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-900/20 blur-[150px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-900/20 blur-[150px] animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        {/* Subtle Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 fixed w-full z-50 bg-[#030712]/50 backdrop-blur-2xl border-b border-white/5 transition-all">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform duration-500">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tight">SmartGen<span className="text-purple-400">.ai</span></span>
        </div>
        <div className="flex gap-6 items-center">
          <MagneticButton onClick={() => navigate('/dashboard')} className="group relative inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all overflow-hidden">
            Log in
          </MagneticButton>
          <MagneticButton onClick={() => navigate('/dashboard')} className="group relative inline-flex items-center justify-center gap-2 bg-white text-black px-7 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
            Start Generating
          </MagneticButton>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <motion.main 
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 pt-40 pb-20 lg:pt-56 lg:pb-32 min-h-screen flex items-center"
      >
        {/* Massive Interactive AI Orb in Hero */}
        <AICoreOrb mouseX={mouseX} mouseY={mouseY} />

        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
            
            {/* Left: Cinematic Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 text-purple-300 font-bold text-xs mb-8 shadow-[0_0_20px_rgba(168,85,247,0.15)] uppercase tracking-widest backdrop-blur-md"
              >
                <Sparkles size={14} className="animate-pulse"/> Next-Gen Marketing AI
              </motion.div>
              
              <h1 className="text-6xl lg:text-8xl font-display font-extrabold mb-8 leading-[1.05] tracking-tight text-white drop-shadow-2xl">
                Campaigns <br />
                <span className="relative inline-block">
                  <span className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 blur-2xl"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    generated by AI.
                  </span>
                </span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-12 max-w-xl font-light leading-relaxed">
                Transform your product idea into high-converting, platform-optimized marketing campaigns in seconds. Stop guessing. Start scaling.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <MagneticButton 
                  onClick={() => navigate('/dashboard')}
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-full text-base font-bold transition-all hover:scale-105 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]"
                >
                  Enter the Workspace <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton className="group relative inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-10 py-5 rounded-full font-bold text-base transition-all backdrop-blur-md">
                  <Play size={18} className="text-slate-400 group-hover:text-white transition-colors fill-current" /> Watch Keynote
                </MagneticButton>
              </div>
            </motion.div>

            {/* Right: Floating AI Workspace Preview */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.4 }}
              style={{ perspective: 1200 }}
              className="relative hidden lg:block"
            >
              {/* Main Dashboard Mockup Card */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative glass-panel rounded-3xl border border-white/10 shadow-2xl overflow-hidden backdrop-blur-3xl bg-[#0b0f19]/80 p-2 z-20"
              >
                <div className="bg-[#050b14]/90 rounded-2xl border border-white/5 p-6 h-[400px] flex flex-col">
                  <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center"><Sparkles size={14} className="text-purple-400"/></div>
                      <div className="font-bold text-sm text-white">SmartGen Logic Core</div>
                    </div>
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded animate-pulse">Generating</div>
                  </div>
                  
                  <div className="text-sm text-slate-300 font-mono text-xs leading-loose flex-1">
                    <span className="text-slate-500">{"// Analyzing target demographic"}</span><br/>
                    {"> "} <TypingText text="Injecting psychological hooks for Tech Audience..." /><br/>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="mt-2 text-green-400">✓ Tone alignment verified.</motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.5 }} className="mt-2 text-blue-400">✓ Social copy structured.</motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Social Output Card */}
              <motion.div 
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-16 -left-16 glass-panel rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-[#0b0f19]/90 p-4 z-30 w-72"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500"></div>
                  <div>
                    <div className="font-bold text-xs text-white">LinkedIn Ad</div>
                    <div className="text-[10px] text-green-400 font-bold">98% Predicted Match</div>
                  </div>
                </div>
                <div className="w-full h-32 bg-slate-800 rounded-lg mb-3 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-50"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-display font-bold text-white px-4 text-center text-sm drop-shadow-md">"Code faster. Think bigger."</div>
                </div>
              </motion.div>

              {/* Floating Analytics Card */}
              <motion.div 
                animate={{ y: [-15, 15, -15], rotate: [0, 2, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -top-12 -right-12 glass-panel rounded-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-[#0b0f19]/90 p-5 z-10 w-64"
              >
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Emotional Impact</div>
                <div className="flex items-end gap-3">
                  <div className="text-4xl font-display font-extrabold text-white">94<span className="text-xl text-purple-500">%</span></div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                    <div className="w-[94%] h-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.main>

      {/* Scrolling Content with Parallax */}
      <motion.div style={{ y: cardsY }} className="relative z-20">
        
        {/* TRUST / STATS SECTION */}
        <section className="py-16 border-y border-white/5 bg-[#050b14]/80 backdrop-blur-xl">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/5">
              {[
                { stat: "10x", label: "Generation Speed", color: "text-purple-400" },
                { stat: "98%", label: "Audience Resonance", color: "text-blue-400" },
                { stat: "AI", label: "Neural Optimization", color: "text-pink-400" },
                { stat: "24/7", label: "Creative Output", color: "text-white" }
              ].map((item, i) => (
                <div key={i} className="text-center px-4">
                  <div className={`text-5xl lg:text-6xl font-display font-extrabold mb-2 ${item.color}`}>{item.stat}</div>
                  <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BEFORE VS AFTER CINEMATIC SECTION */}
        <section className="py-40 relative overflow-hidden">
          {/* Subtle background glow for this section */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10">
            <div className="text-center mb-24">
              <h2 className="text-4xl lg:text-6xl font-display font-extrabold text-white mb-6 tracking-tight">The Paradigm Shift</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-xl font-light">Witness the difference between generic copywriting and emotionally-targeted AI synthesis.</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Before */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-10 rounded-3xl border-white/5 opacity-60 grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl bg-[#0b0f19]/50"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="text-xs text-slate-500 uppercase tracking-widest font-bold flex items-center gap-2">
                    <XCircle size={16} className="text-slate-500" /> Traditional Marketing
                  </div>
                </div>
                <div className="text-2xl font-medium mb-10 text-slate-400 leading-relaxed font-serif italic">
                  "Buy our new noise-cancelling headphones today. They have great sound quality and a long battery life."
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-800/50 px-4 py-2 rounded-lg text-xs font-bold text-slate-400 border border-slate-700">Generic Tone</span>
                  <span className="bg-slate-800/50 px-4 py-2 rounded-lg text-xs font-bold text-slate-400 border border-slate-700">Low Conversion</span>
                </div>
              </motion.div>
              
              {/* After */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="glass-panel p-10 rounded-3xl neon-border relative overflow-hidden group bg-[#0b0f19]"
              >
                <div className="absolute -top-32 -right-32 w-64 h-64 bg-purple-500/30 blur-[80px] rounded-full group-hover:bg-purple-500/40 transition-colors duration-700"></div>
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className="text-xs text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                    <CheckCircle2 size={16} /> SmartGen Intelligence
                  </div>
                  <div className="px-3 py-1.5 bg-purple-500/20 rounded border border-purple-500/30 text-[10px] text-purple-300 font-bold tracking-widest uppercase">Target: Professionals</div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold mb-10 text-white leading-tight font-display relative z-10 drop-shadow-lg">
                  "Silence the chaos. Immerse yourself in deep work with studio-grade isolation."
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-4 py-2 rounded-lg text-xs font-bold shadow-[0_0_15px_rgba(168,85,247,0.2)]">High Emotion</span>
                  <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-4 py-2 rounded-lg text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">Productivity Hook</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <footer className="relative py-40 border-t border-white/5 text-center overflow-hidden bg-[#030712]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10 pointer-events-none"></div>
          <div className="container mx-auto px-6 relative z-10">
            <h2 className="text-5xl lg:text-7xl font-display font-extrabold text-white mb-10 tracking-tight">Deploy your next campaign.</h2>
            <MagneticButton 
              onClick={() => navigate('/dashboard')}
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-6 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              Initialize Workspace <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
