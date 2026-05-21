import React from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, LayoutDashboard, Users, Image as ImageIcon, Bookmark, Settings as SettingsIcon, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'Audience Comparison', path: '/dashboard/comparison', icon: <Users size={18} /> },
    { name: 'AI Poster Studio', path: '/dashboard/poster', icon: <ImageIcon size={18} /> },
  ];

  const workspaceItems = [
    { name: 'Saved Campaigns', path: '/dashboard/saved', icon: <Bookmark size={18} /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <SettingsIcon size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#030712] text-slate-100 overflow-hidden font-sans">
      
      {/* Premium Sidebar */}
      <aside className="w-72 bg-[#050b14] border-r border-white/5 flex flex-col z-20 relative shadow-2xl shadow-black">
        {/* Subtle top glow */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        
        <div className="p-8 flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-transform">
            <Sparkles className="text-white" size={20} />
          </div>
          <span className="text-2xl font-display font-bold text-white tracking-tight">SmartGen<span className="text-purple-400">.ai</span></span>
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <div className="px-4 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Main Menu</div>
          
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'text-white bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/5' 
                  : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200 border border-transparent'
              }`}
            >
              {({ isActive }) => (
                <>
                  {/* Glowing active indicator */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-400'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  
                  {isActive && <ChevronRight size={14} className="text-slate-500 opacity-50" />}
                </>
              )}
            </NavLink>
          ))}
          
          <div className="px-4 mt-8 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Workspace</div>
          
          {workspaceItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `group relative flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium ${
                isActive 
                  ? 'text-white bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] border border-white/5' 
                  : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200 border border-transparent'
              }`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div 
                      layoutId="active-nav"
                      className="absolute left-0 w-1 h-8 bg-purple-500 rounded-r-full shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-400'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* User Profile Mock */}
        <div className="p-4 mx-4 mb-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold shadow-[0_0_10px_rgba(236,72,153,0.3)]">
              {user?.initials || 'U'}
            </div>
            <div>
              <div className="text-sm font-bold text-white leading-tight truncate w-32">{user?.name || 'User'}</div>
              <div className="text-[10px] text-slate-400">{user?.plan || 'Free Plan'}</div>
            </div>
          </div>
          <button onClick={(e) => { 
            e.stopPropagation(); 
            logout(); 
            navigate('/login'); 
          }} className="text-slate-500 hover:text-red-400 transition-colors p-2">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative bg-[#030712]">
        {/* Ambient mesh gradient background */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] bg-blue-900/10 rounded-full blur-[100px]"></div>
        </div>
        
        {/* Page Transition Wrapper */}
        <div className="relative z-10 w-full h-full overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
