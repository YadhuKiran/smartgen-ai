import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Presentation, Trash2, Calendar, Copy, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function SavedCampaigns() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('smartgen_campaigns') || '[]');
    setCampaigns(saved);
  }, []);

  const deleteCampaign = (id) => {
    const updated = campaigns.filter(c => c.id !== id);
    localStorage.setItem('smartgen_campaigns', JSON.stringify(updated));
    setCampaigns(updated);
  };

  return (
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <Bookmark className="text-purple-400" /> Saved Campaigns
        </h1>
        <p className="text-slate-400">Access and manage your previously generated marketing campaigns.</p>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 glassmorphism rounded-2xl border-slate-700/50 text-slate-500">
          <Bookmark size={48} className="mb-4 opacity-50" />
          <p>No saved campaigns yet. Generate one in the Dashboard!</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-6 py-2 bg-purple-600/20 text-purple-300 border border-purple-500/30 rounded-full hover:bg-purple-600/30 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp, idx) => (
            <motion.div 
              key={camp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glassmorphism p-6 rounded-2xl border-slate-700/50 relative group hover:border-purple-500/50 transition-colors flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-800/50 px-3 py-1 rounded-full">
                  <Calendar size={12} /> {new Date(camp.date).toLocaleDateString()}
                </div>
                <button 
                  onClick={() => deleteCampaign(camp.id)}
                  className="text-slate-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Delete Campaign"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <div className="mb-4">
                <div className="text-xs uppercase font-bold text-purple-400 tracking-wider mb-1">Product</div>
                <h3 className="text-xl font-bold text-white truncate">{camp.productName}</h3>
                <div className="text-sm text-slate-400 truncate">{camp.category} • {camp.platform}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-xs uppercase font-bold text-blue-400 tracking-wider mb-1">Slogan</div>
                <p className="text-sm text-slate-300 italic line-clamp-2">"{camp.result.slogan}"</p>
              </div>
              
              <div className="flex gap-2 mt-auto">
                <button 
                  onClick={() => navigate('/presentation', { state: { presentationData: camp.result } })}
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/80 to-blue-600/80 hover:from-purple-500 hover:to-blue-500 text-white font-medium py-2 px-4 rounded-xl transition-all text-sm"
                >
                  <Presentation size={16} /> Present
                </button>
                <button 
                  onClick={() => navigate('/dashboard/poster', { state: { prompt: camp.result.slogan + " " + camp.result.adCopy } })}
                  className="flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-white p-2 rounded-xl transition-all border border-slate-700 hover:border-slate-600"
                  title="Generate Poster"
                >
                  <ImageIcon size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
