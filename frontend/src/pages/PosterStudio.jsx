import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Loader2, Wand2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function PosterStudio() {
  const location = useLocation();
  const [prompt, setPrompt] = useState(location.state?.prompt || '');
  const [imageUrl, setImageUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    // Pollinations AI just takes the prompt in the URL. We encode it.
    // Adding a random seed to avoid caching
    const encodedPrompt = encodeURIComponent(prompt.trim() + " highly detailed, professional marketing poster, 8k resolution, cinematic lighting");
    const seed = Math.floor(Math.random() * 1000000);
    const generatedUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=1024&nologo=true`;
    
    // Simulate loading for better UX, though image loads async
    setTimeout(() => {
      setImageUrl(generatedUrl);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <ImageIcon className="text-pink-400" /> AI Poster Studio
        </h1>
        <p className="text-slate-400">Generate stunning promotional imagery using text descriptions.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 h-[calc(100%-100px)]">
        {/* Controls */}
        <div className="glassmorphism p-6 rounded-2xl border-slate-700/50 flex flex-col">
          <h2 className="text-xl font-bold mb-6">Design Your Poster</h2>
          <form onSubmit={handleGenerate} className="flex-1 flex flex-col">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-400 mb-2">Image Prompt</label>
              <textarea 
                required
                rows="6"
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-all resize-none"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the poster... e.g. 'A sleek, futuristic smart watch floating in space with neon purple lighting'"
              />
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-xs text-slate-500 font-bold uppercase w-full">Quick Additions</span>
                {['Cyberpunk', 'Minimalist', 'Luxurious', 'Photorealistic', '3D Render'].map(tag => (
                  <button type="button" key={tag} onClick={() => setPrompt(p => p + `, ${tag}`)} className="bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 px-3 py-1 rounded-full border border-slate-700">+{tag}</button>
                ))}
              </div>
            </div>
            
            <button 
              type="submit"
              disabled={isGenerating || !prompt}
              className="w-full mt-4 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50"
            >
              {isGenerating ? <><Loader2 className="animate-spin" size={20} /> Generating Magic...</> : <><Wand2 size={20} /> Generate Poster</>}
            </button>
          </form>
        </div>

        {/* Output */}
        <div className="glassmorphism p-6 rounded-2xl border-slate-700/50 flex flex-col items-center justify-center relative min-h-[400px]">
          {isGenerating ? (
            <div className="text-center">
              <Loader2 className="animate-spin text-pink-500 mb-4 mx-auto" size={48} />
              <p className="text-pink-400 font-bold animate-pulse">Rendering AI Graphics...</p>
            </div>
          ) : imageUrl ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full relative flex items-center justify-center group">
              <img src={imageUrl} alt="Generated Poster" className="max-w-full max-h-full rounded-lg object-contain shadow-2xl shadow-pink-500/20" />
              <a 
                href={imageUrl} 
                target="_blank" 
                rel="noreferrer"
                download
                className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur text-white p-3 rounded-full hover:bg-pink-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Download size={20} />
              </a>
            </motion.div>
          ) : (
            <div className="text-slate-500 text-center opacity-50">
              <ImageIcon size={64} className="mx-auto mb-4" />
              <p>Your generated poster will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
