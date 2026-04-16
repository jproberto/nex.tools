import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MobileNavProps {
  isOpen: boolean;
  navItems: { id: string; label: string; icon: React.ReactNode }[];
  activeView: string;
  setActiveView: (id: any) => void;
  setMenuOpen: (val: boolean) => void;
}

export const MobileNav = ({ isOpen, navItems, activeView, setActiveView, setMenuOpen }: MobileNavProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="lg:hidden border-t border-app-border bg-black overflow-hidden relative z-50"
      >
        <div className="flex flex-col p-4 gap-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setMenuOpen(false); }}
              className={`p-4 text-xs uppercase font-bold tracking-widest text-left flex items-center gap-4
                ${activeView === item.id ? 'text-app-accent bg-app-surface' : 'opacity-50'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);
