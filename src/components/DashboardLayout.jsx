import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sparkles, LayoutDashboard, Users, Image as ImageIcon, Bookmark, Settings, LogOut } from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Audience Comparison', path: '/dashboard/comparison', icon: <Users size={20} /> },
    { name: 'AI Poster Studio', path: '/dashboard/poster', icon: <ImageIcon size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glassmorphism border-r border-slate-700/50 flex flex-col z-20">
        <div className="p-6 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <Sparkles className="text-purple-400" size={24} />
          <span className="text-xl font-bold text-gradient">SmartGen AI</span>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive 
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
          
          <div className="pt-8 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Workspace
          </div>
          <NavLink to="/dashboard/saved" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all font-medium">
            <Bookmark size={20} /> Saved Campaigns
          </NavLink>
          <NavLink to="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 transition-all font-medium">
            <Settings size={20} /> Settings
          </NavLink>
        </nav>
        
        <div className="p-4 border-t border-slate-700/50">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full font-medium">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative aurora-bg">
        <Outlet />
      </main>
    </div>
  );
}
