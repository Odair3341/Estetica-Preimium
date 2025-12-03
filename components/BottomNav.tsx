import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTabColor = (path: string) => {
    return location.pathname === path ? 'text-primary' : 'text-zinc-500 dark:text-zinc-400';
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 z-50 pb-safe">
      <div className="flex justify-around h-16 items-center px-1">
        <button 
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center justify-center gap-1 w-full ${getTabColor('/dashboard')}`}
        >
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Início</span>
        </button>
        
        <button 
          onClick={() => navigate('/services')}
          className={`flex flex-col items-center justify-center gap-1 w-full ${getTabColor('/services')}`}
        >
          <span className="material-symbols-outlined">spa</span>
          <span className="text-[10px] font-medium">Estética</span>
        </button>
        
        {/* Center Store Button */}
        <button 
           onClick={() => navigate('/store')}
          className={`flex flex-col items-center justify-center w-14 h-14 -mt-6 rounded-full bg-primary shadow-lg shadow-primary/40 text-white hover:shadow-primary/50 transition-all active:scale-95`}
        >
          <span className="material-symbols-outlined">shopping_bag</span>
        </button>

        <button 
           onClick={() => navigate('/schedule')}
          className={`flex flex-col items-center justify-center gap-1 w-full ${getTabColor('/schedule')}`}
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="text-[10px] font-medium">Agenda</span>
        </button>
        
        <button 
          onClick={() => navigate('/finance')}
          className={`flex flex-col items-center justify-center gap-1 w-full ${getTabColor('/finance')}`}
        >
          <span className="material-symbols-outlined">payments</span>
          <span className="text-[10px] font-medium">Finanças</span>
        </button>
        
        <button 
          onClick={() => navigate('/management')}
          className={`flex flex-col items-center justify-center gap-1 w-full ${getTabColor('/management')}`}
        >
          <span className="material-symbols-outlined">admin_panel_settings</span>
          <span className="text-[10px] font-bold">Gestão</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
