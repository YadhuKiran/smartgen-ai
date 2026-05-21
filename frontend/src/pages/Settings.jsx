import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Save, Check } from 'lucide-react';

export default function Settings() {
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
    <div className="p-8 h-full overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <SettingsIcon className="text-blue-400" /> Workspace Settings
        </h1>
        <p className="text-slate-400">Configure your default preferences for campaign generation.</p>
      </div>

      <div className="max-w-2xl glassmorphism p-8 rounded-2xl border-slate-700/50">
        <form onSubmit={handleSave} className="space-y-6">
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Default Category</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                value={settings.defaultCategory}
                onChange={(e) => setSettings({...settings, defaultCategory: e.target.value})}
              >
                {['Technology', 'Food', 'Fashion', 'Fitness', 'Education', 'Beauty', 'Travel', 'Finance'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Default Audience</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                value={settings.defaultAudience}
                onChange={(e) => setSettings({...settings, defaultAudience: e.target.value})}
              >
                {['Students', 'Professionals', 'Gamers', 'Fitness Enthusiasts', 'Parents', 'Luxury Customers', 'Entrepreneurs', 'Gen Z'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Default Brand Style</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                value={settings.defaultBrandStyle}
                onChange={(e) => setSettings({...settings, defaultBrandStyle: e.target.value})}
              >
                {['Apple-style', 'Nike-style', 'Tesla-style', 'Starbucks-style', 'Startup-style', 'Luxury Premium'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Default Platform</label>
              <select 
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                value={settings.defaultPlatform}
                onChange={(e) => setSettings({...settings, defaultPlatform: e.target.value})}
              >
                {['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'YouTube', 'Email Campaign'].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-700/50 mt-8 flex justify-end">
            <button 
              type="submit"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 px-8 rounded-xl transition-all"
            >
              {isSaved ? <><Check size={20} /> Saved!</> : <><Save size={20} /> Save Preferences</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
