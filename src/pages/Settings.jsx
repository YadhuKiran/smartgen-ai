import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Check, User, Mail, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [settings, setSettings] = useState({
    defaultCategory: 'Technology',
    defaultAudience: 'Professionals',
    defaultBrandStyle: 'Apple-style',
    defaultPlatform: 'LinkedIn',
    defaultLanguage: 'English'
  });

  useEffect(() => {
    const saved = localStorage.getItem('smartgen_settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('smartgen_settings', JSON.stringify(settings));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-[#030712]">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3 text-white">
          <SettingsIcon className="text-blue-400" /> Settings & Profile
        </h1>
        <p className="text-slate-400">Manage your account and workspace preferences.</p>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-8 max-w-6xl">
        
        {/* User Profile Section */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#050b14] shadow-2xl h-fit">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Account Profile</h2>
          
          <div className="flex flex-col items-center mb-8">
            <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-display font-bold text-white shadow-[0_0_30px_rgba(236,72,153,0.3)] mb-4">
              {user?.initials || 'U'}
            </div>
            <h3 className="text-xl font-bold text-white">{user?.name || 'User'}</h3>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-bold mt-2 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Shield size={12} /> {user?.plan || 'Free Plan'}
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 text-slate-400 text-sm mb-1"><User size={14} /> Full Name</div>
              <div className="text-white font-medium pl-6">{user?.name || 'Not provided'}</div>
            </div>
            <div className="bg-white/[0.02] p-4 rounded-xl border border-white/5">
              <div className="flex items-center gap-3 text-slate-400 text-sm mb-1"><Mail size={14} /> Email Address</div>
              <div className="text-white font-medium pl-6">{user?.email || 'Not provided'}</div>
            </div>
          </div>
        </div>

        {/* Workspace Settings Section */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-[#050b14] shadow-2xl">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Generation Defaults</h2>
          
          <form onSubmit={handleSave} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Default Category</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  value={settings.defaultCategory}
                  onChange={(e) => setSettings({...settings, defaultCategory: e.target.value})}
                >
                  {['Technology', 'Food', 'Fashion', 'Fitness', 'Education', 'Beauty', 'Travel', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Default Audience</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  value={settings.defaultAudience}
                  onChange={(e) => setSettings({...settings, defaultAudience: e.target.value})}
                >
                  {['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Luxury Customers', 'Entrepreneurs', 'Gen Z'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Default Brand Style</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  value={settings.defaultBrandStyle}
                  onChange={(e) => setSettings({...settings, defaultBrandStyle: e.target.value})}
                >
                  {['Apple-style', 'Nike-style', 'Tesla-style', 'Starbucks-style', 'Startup-style', 'Luxury Premium'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Default Platform</label>
                <select 
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-purple-500 transition-colors"
                  value={settings.defaultPlatform}
                  onChange={(e) => setSettings({...settings, defaultPlatform: e.target.value})}
                >
                  {['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Email Campaign'].map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="pt-8 mt-8 flex justify-end">
              <button 
                type="submit"
                className="relative group overflow-hidden rounded-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-2 text-white font-bold py-3 px-8 transition-all">
                  {isSaved ? <><Check size={18} /> Saved!</> : <><Save size={18} /> Save Preferences</>}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
