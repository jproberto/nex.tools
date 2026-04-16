import { motion } from 'motion/react';
import { Heart, MessageSquare } from 'lucide-react';

export const AboutView = () => {
  return (
    <motion.div 
      key="sobre"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-3xl mx-auto space-y-12 py-12"
    >
      <section className="space-y-4">
        <h2 className="text-4xl font-black uppercase italic text-app-accent">O Projeto</h2>
        <p className="leading-relaxed opacity-70">
          O <span className="text-app-accent">nex.tools</span> nasceu da necessidade de uma ferramenta rápida, moderna e imersiva para jogadores e mestres de Ordem Paranormal. 
          Nosso objetivo é facilitar a consulta de regras e conteúdos, mantendo a atmosfera de investigação e mistério do sistema.
        </p>
        <p className="text-sm opacity-50 italic">
          Nota: Este é um projeto de fã. Todo o conteúdo original é propriedade da Jambô Editora e Cellbit. 
          Nós reescrevemos as descrições para fins de consulta rápida e sempre referenciamos a página original do livro.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="p-8 border border-app-border bg-app-surface space-y-4">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-app-accent" />
            <h3 className="text-xl font-bold uppercase">Apoie</h3>
          </div>
          <p className="text-sm opacity-70">
            Manter o servidor e o domínio tem um custo. Se a ferramenta é útil para você, considere ajudar com qualquer valor.
          </p>
          <button className="w-full py-3 border border-app-border text-[10px] font-black uppercase tracking-widest hover:bg-app-accent hover:text-black transition-all">
            Contribuir via PIX
          </button>
        </section>

        <section className="p-8 border border-app-border bg-app-surface space-y-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-6 h-6 text-app-accent" />
            <h3 className="text-xl font-bold uppercase">Contato</h3>
          </div>
          <p className="text-sm opacity-70">
            Encontrou um erro nos dados? Tem uma sugestão de utilitário? Entre em contato conosco.
          </p>
          <button className="w-full py-3 border border-app-border text-[10px] font-black uppercase tracking-widest hover:bg-app-accent hover:text-black transition-all">
            Enviar Feedback
          </button>
        </section>
      </div>
    </motion.div>
  );
};
