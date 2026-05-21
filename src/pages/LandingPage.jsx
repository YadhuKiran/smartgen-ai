import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Zap, Target, Image as ImageIcon, BarChart } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 lg:px-12 glassmorphism border-b border-slate-700/50 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <Sparkles className="text-purple-400" size={28} />
          <span className="text-2xl font-bold text-gradient">SmartGen AI</span>
        </div>
        <button 
          onClick={() => navigate('/dashboard')}
          className="bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-white px-6 py-2 rounded-full font-medium"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium text-sm mb-6">
            ✨ The Future of Personalized Marketing
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight">
            Generate AI-Powered <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400">
              Personalized Campaigns
            </span> <br/>
            in Seconds.
          </h1>
          
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Stop writing generic ads. SmartGen AI analyzes your product, target audience, and brand tone to generate highly-converting, platform-optimized marketing content.
          </p>

          <button 
            onClick={() => navigate('/dashboard')}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 p-[2px] rounded-full overflow-hidden hover:scale-105 transition-transform"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-50 group-hover:opacity-100 transition-opacity"></span>
            <span className="relative flex items-center gap-3 bg-slate-900/90 px-8 py-4 rounded-full text-lg font-bold text-white">
              Start Generating <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-4 gap-6 mt-32">
          {[
            { icon: <Zap size={32}/>, title: "AI Copy Generation", desc: "Instantly create slogans, captions, and ad copy." },
            { icon: <Target size={32}/>, title: "Audience Personalization", desc: "Tailor messaging for any specific demographic." },
            { icon: <ImageIcon size={32}/>, title: "AI Poster Studio", desc: "Generate promotional images in one click." },
            { icon: <BarChart size={32}/>, title: "Engagement Insights", desc: "Predict performance before you post." }
          ].map((feat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.5 }}
              className="glassmorphism p-8 rounded-2xl text-left hover:-translate-y-2 transition-transform duration-300 neon-border"
            >
              <div className="text-purple-400 mb-4">{feat.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
              <p className="text-slate-400">{feat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Before vs After AI Section */}
        <div className="mt-40 mb-20 text-left">
          <h2 className="text-4xl font-bold text-center mb-16">The Power of Personalization</h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <div className="glassmorphism p-8 rounded-2xl border-slate-700 opacity-70">
              <div className="text-sm text-slate-400 uppercase tracking-wider font-bold mb-4">Before AI (Generic)</div>
              <div className="text-xl font-medium mb-6">"Buy our protein bar today. It tastes good and has protein."</div>
              <div className="flex gap-2">
                <span className="bg-slate-800 px-3 py-1 rounded-md text-xs text-slate-400">Boring</span>
                <span className="bg-slate-800 px-3 py-1 rounded-md text-xs text-slate-400">Low Conversion</span>
              </div>
            </div>
            
            {/* After */}
            <div className="glassmorphism p-8 rounded-2xl neon-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full"></div>
              <div className="text-sm text-purple-400 uppercase tracking-wider font-bold mb-4 flex items-center gap-2">
                <Sparkles size={16} /> After SmartGen AI
              </div>
              <div className="text-2xl font-bold mb-6 text-white leading-tight">
                "Fuel every rep. Clean protein power to push past your limits."
              </div>
              <div className="flex gap-2">
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-md text-xs">High Emotion</span>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-md text-xs">Fitness Audience</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
