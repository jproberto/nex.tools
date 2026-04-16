import { motion } from 'motion/react';

export const ContentPlaceholder = () => (
  <motion.div 
    key="placeholder"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-64 flex items-center justify-center opacity-20"
  >
    <p className="text-xs uppercase tracking-[0.5em] font-bold italic">Seção em desenvolvimento</p>
  </motion.div>
);
