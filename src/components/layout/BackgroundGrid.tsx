import { motion } from 'motion/react';

export const BackgroundGrid = () => (
  <div className="fixed inset-0 pointer-events-none opacity-[0.03]" 
       style={{ backgroundImage: 'radial-gradient(var(--color-app-accent) 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
);
