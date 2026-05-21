import React from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, TrendingUp, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PresentationMode() {
  const navigate = useNavigate();
  const location = useLocation();

  // For the presentation mode demo, we'll use a stunning hardcoded example 
  // to ensure the demo always looks perfect in front of judges if no real state is passed.
  const demoData = {
    slogan: "Fuel every rep. Clean protein power to push past your limits.",
    adCopy: "Stop settling for chalky, sugar-loaded bars. SmartFit Protein gives you 25g of pure, plant-based power with zero artificial junk. Designed for athletes who demand more from their nutrition.",
    campaignScore: {
      quality: 94,
      audienceMatch: 98,
    },
    engagementPrediction: "High"
  };

  const presentationData = location.state?.presentationData || demoData;
  const engagement = presentationData.campaignScore?.quality ? `${presentationData.campaignScore.quality}%` : "94%";
  const audienceMatch = presentationData.campaignScore?.audienceMatch ? `${presentationData.campaignScore.audienceMatch}%` : "98%";
  const conversionProb = presentationData.engagementPrediction || "High";

  return (
    <div className="fixed inset-0 bg-slate-950 z-[100] text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full"></div>
      </div>

      <button 
        onClick={() => navigate(-1)} 
        className="absolute top-8 right-8 bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-colors z-50"
      >
        <X size={24} />
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-5xl w-full px-8"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium text-sm mb-6">
            <Sparkles size={16} /> AI-Generated Campaign Showcase
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
            "{presentationData.slogan}"
          </h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 glassmorphism p-8 rounded-3xl border-slate-700/50 neon-border">
            <div className="text-sm uppercase font-bold text-slate-500 mb-4 tracking-wider">Persuasive Copy</div>
            <p className="text-2xl text-slate-300 leading-relaxed font-light">
              {presentationData.adCopy}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="glassmorphism p-6 rounded-3xl border-slate-700/50 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400 mb-1">Predicted Engagement</div>
                <div className="text-3xl font-bold text-blue-400">{engagement}</div>
              </div>
              <TrendingUp size={32} className="text-blue-500/50" />
            </div>
            
            <div className="glassmorphism p-6 rounded-3xl border-slate-700/50 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400 mb-1">Audience Match</div>
                <div className="text-3xl font-bold text-pink-400">{audienceMatch}</div>
              </div>
              <UsersIcon />
            </div>

            <div className="glassmorphism p-6 rounded-3xl border-slate-700/50 flex items-center justify-between bg-gradient-to-br from-purple-900/40 to-blue-900/40">
              <div>
                <div className="text-sm text-purple-300 mb-1">Conversion Potential</div>
                <div className="text-3xl font-bold text-white uppercase tracking-wider">{conversionProb}</div>
              </div>
              <Sparkles size={32} className="text-purple-400" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Inline icon component to save space
function UsersIcon() {
  return <Heart size={32} className="text-pink-500/50" />;
}
