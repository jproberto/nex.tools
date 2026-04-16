import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  navItems: { id: string; label: string; icon: React.ReactNode }[];
  activeView: string;
  setActiveView: (id: any) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
}

export const Navbar = ({ navItems, activeView, setActiveView, isMenuOpen, setIsMenuOpen }: NavbarProps) => {
  return (
    <nav className="shrink-0 border-b border-app-border bg-black/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black italic tracking-tighter text-app-accent">nex.tools</h1>
          <div className="hidden md:block text-[10px] font-bold px-1 bg-app-accent text-black">V1.0</div>
        </div>
        
        <div className="hidden lg:flex gap-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`px-3 py-2 text-[10px] uppercase font-bold tracking-widest transition-all flex items-center gap-2 border-b-2
                ${activeView === item.id ? 'border-app-accent text-app-accent' : 'border-transparent opacity-50 hover:opacity-100'}`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 opacity-70 hover:opacity-100"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};
