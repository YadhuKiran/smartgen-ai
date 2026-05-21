import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Download, RefreshCw, Wand2, Plus, Sparkles } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function PosterStudio() {
  const location = useLocation();
  const initialPrompt = location.state?.prompt || '';
  
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(null);

  const handleGenerate = async (e) => {
    e?.preventDefault();
    if (!prompt) return;
    
    setIsGenerating(true);
    setImage(null);
    
    // Simulate API delay for dramatic effect then load the image
    setTimeout(() => {
      // Use pollinations.ai to generate image directly from prompt
      // Appending a random seed parameter ensures a fresh image if prompt is the same
      const seed = Math.floor(Math.random() * 1000000);
      const styleSuffix = " cinematic lighting, highly detailed, photorealistic, 8k";
      const fullPrompt = prompt + styleSuffix;
      const width = 1080;
      const height = 1080; // Defaulting to 1:1 for simplicity, can be expanded
      
      const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?width=${width}&height=${height}&seed=${seed}&nologo=true`;
      
      // Preload image to avoid showing broken image icon while it loads
      const img = new window.Image();
      img.src = imageUrl;
      img.onload = () => {
        setImage(imageUrl);
        setIsGenerating(false);
      };
      img.onerror = () => {
        setIsGenerating(false);
        alert("Failed to generate image. Please try again.");
      }
    }, 2000);
  };

  useEffect(() => {
    if (initialPrompt && !image) {
      handleGenerate();
    }
  }, []);

  return (
    <div className="flex flex-col h-full w-full bg-[#030712] relative overflow-hidden">
      {/* Studio Ambience Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[60%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full"></div>
        {/* Subtle grid for a "workspace" feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      {/* Top Bar */}
      <div className="p-6 relative z-20 flex-shrink-0 flex justify-between items-end border-b border-white/5 bg-[#030712]/80 backdrop-blur-xl">
        <div>
          <h1 className="text-3xl font-display font-bold text-white flex items-center gap-3">
            <Wand2 className="text-purple-400" size={28}/> AI Poster Studio
          </h1>
          <p className="text-slate-400 text-sm mt-1">Generate stunning, production-ready promotional images.</p>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        
        {/* Left: Configuration Panel */}
        <div className="w-80 border-r border-white/5 bg-[#050b14] p-6 flex flex-col z-20 shadow-2xl">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Image Prompt</h2>
          <form onSubmit={handleGenerate} className="flex flex-col h-full">
            <textarea 
              className="w-full h-40 bg-slate-900 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:outline-none focus:border-purple-500 transition-all resize-none mb-6 shadow-inner"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the poster you want to generate. e.g., 'Cinematic product shot of a glowing energy drink on a dark rocky surface, purple neon lighting, 8k resolution, photorealistic'"
            />

            <div className="space-y-6 flex-1">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-500/20 border border-purple-500/50 text-purple-300 rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-4 h-4 border-2 border-purple-400 mb-1"></div>
                    <span className="text-[10px] font-bold">1:1</span>
                  </div>
                  <div className="bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20 rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <div className="w-5 h-4 border-2 border-slate-500 mb-1"></div>
                    <span className="text-[10px] font-bold">16:9</span>
                  </div>
                  <div className="bg-slate-900 border border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20 rounded-lg py-2 flex flex-col items-center justify-center cursor-pointer transition-colors">
                    <div className="w-4 h-5 border-2 border-slate-500 mb-1"></div>
                    <span className="text-[10px] font-bold">9:16</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Style Preset</label>
                <select className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none focus:border-purple-500 appearance-none">
                  <option>Cinematic Photography</option>
                  <option>3D Render (Octane)</option>
                  <option>Minimalist Vector</option>
                  <option>Neon Cyberpunk</option>
                  <option>Studio Lighting</option>
                </select>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isGenerating || !prompt}
              className="mt-auto w-full relative group overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center justify-center gap-2 text-white font-bold py-4 px-6 transition-all disabled:opacity-50">
                {isGenerating ? <><Loader2 className="animate-spin" size={18}/> Generating...</> : <><Sparkles size={18}/> Render Image</>}
              </div>
            </button>
          </form>
        </div>

        {/* Right: Darkroom Canvas */}
        <div className="flex-1 bg-[#020408] relative overflow-hidden flex items-center justify-center p-12 shadow-[inset_20px_0_40px_rgba(0,0,0,0.5)]">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                {/* Laser scan animation */}
                <div className="relative w-80 h-80 border-2 border-white/10 rounded-2xl overflow-hidden bg-slate-900/50 shadow-2xl flex items-center justify-center">
                  <div className="absolute top-0 w-full h-[2px] bg-purple-500 shadow-[0_0_20px_purple] animate-[scan_2s_ease-in-out_infinite_alternate]"></div>
                  <ImageIcon size={48} className="text-white/10" />
                </div>
                <div className="mt-8 text-center">
                  <div className="text-xl font-display font-bold text-white mb-2 tracking-wide">Rendering Pixels</div>
                  <div className="text-xs text-purple-400 font-mono flex items-center gap-2">
                    APPLYING DIFFUSION MODEL <span className="inline-block w-1.5 h-3 bg-purple-400 animate-pulse"></span>
                  </div>
                </div>
              </motion.div>
            ) : image ? (
              <motion.div 
                key="image"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group"
              >
                {/* Ambient dynamic glow based on image (simulated with generic purple/blue glow) */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-purple-500/40 to-blue-500/40 blur-[80px] rounded-[3rem] opacity-50 group-hover:opacity-80 transition-opacity duration-1000 -z-10"></div>
                
                {/* Cinematic Frame */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-crosshair transform transition-transform duration-700 ease-out group-hover:scale-[1.02]">
                  <img src={image} alt="Generated Campaign Poster" className="max-w-full max-h-[70vh] object-contain block" />
                  
                  {/* Floating Action Controls on Hover */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                    <div className="flex gap-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-bold backdrop-blur-md transition-all shadow-xl">
                        <Download size={18}/> Download 8K
                      </button>
                      <button onClick={handleGenerate} className="flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full font-bold backdrop-blur-md transition-all shadow-xl">
                        <RefreshCw size={18}/>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-600">
                <div className="w-24 h-24 rounded-full border border-white/5 flex items-center justify-center mb-6 shadow-inner">
                  <ImageIcon size={32} />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-500 mb-2">Blank Canvas</h3>
                <p className="text-sm max-w-sm text-center">Describe your vision on the left panel to begin the rendering process.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(320px); }
        }
      `}} />
    </div>
  );
}
