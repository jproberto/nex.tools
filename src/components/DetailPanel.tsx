import { Ritual, Habilidade, RitualVersao } from '../types/ritual';
import { Sparkles, Brain } from 'lucide-react';

interface DetailPanelProps {
  item: Ritual | Habilidade;
  onClose: () => void;
}

export const DetailPanel = ({ item, onClose }: DetailPanelProps) => {
  const isRitual = (i: Ritual | Habilidade): i is Ritual => 'circulo' in i;

  return (
    <div className="p-8 space-y-8">
      <header className="space-y-2">
        <div className="flex items-center gap-2">
          {isRitual(item) ? <Brain className="w-4 h-4 text-app-accent" /> : <Sparkles className="w-4 h-4 text-app-accent" />}
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-app-accent">
            {isRitual(item) ? `${item.elemento} • ${item.circulo}º Círculo` : `${item.tipo} • ${item.categoria}`}
          </span>
        </div>
        <h2 className="text-4xl font-black uppercase tracking-tighter italic">{item.nome}</h2>
      </header>

      {isRitual(item) ? (
        <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold opacity-60">
          <DetailField label="Execução" value={item.execucao} />
          <DetailField label="Alcance" value={item.alcance} />
          <DetailField label="Alvo" value={item.alvo} />
          <DetailField label="Duração" value={item.duracao} />
          <DetailField label="Resistência" value={item.resistencia || 'Nenhuma'} />
          <DetailField label="Fonte" value={`${item.fonte} ${item.referencia_pagina}`} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-[10px] uppercase tracking-widest font-bold opacity-60">
          <DetailField label="Pré-Requisito" value={item.requisito || 'N/A'} />
          <DetailField label="Custo" value={item.custo || 'N/A'} />
          <DetailField label="Fonte" value={`${item.fonte} ${item.referencia_pagina}`} colSpan={2} />
          {item.pericias && <DetailField label="Perícias" value={item.pericias} colSpan={2} />}
          {item.itens_iniciais && <DetailField label="Itens Iniciais" value={item.itens_iniciais} colSpan={2} />}
        </div>
      )}

      <div className="space-y-6">
        {isRitual(item) ? (
          item.versoes.map((versao, idx) => (
            <div key={idx}>
              <RitualVersaoCard versao={versao} index={idx} />
            </div>
          ))
        ) : (
          <div className="space-y-6">
            <div className="p-4 border border-app-border bg-white/5 space-y-3">
              <p className="text-sm leading-relaxed opacity-80 italic">{item.descricao}</p>
            </div>
            {item.afinidade && (
              <div className="p-4 border border-app-accent bg-app-accent/5 space-y-3">
                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-app-accent text-black">Afinidade</span>
                <p className="text-sm leading-relaxed opacity-80 italic">{item.afinidade}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const DetailField = ({ label, value, colSpan = 1 }: { label: string; value: string; colSpan?: number }) => (
  <div className={`space-y-1 ${colSpan === 2 ? 'col-span-2' : ''}`}>
    <span className="opacity-40 block">{label}</span>
    <span>{value}</span>
  </div>
);

const RitualVersaoCard = ({ versao, index }: { versao: RitualVersao; index: number }) => (
  <div className="p-4 border border-app-border bg-white/5 space-y-3 relative">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-app-accent text-black">{versao.tipo}</span>
        {versao.requisito && (
          <span className="text-[9px] uppercase font-bold text-app-accent/70">REQ: {versao.requisito}</span>
        )}
      </div>
      <span className="text-[10px] font-bold opacity-50">{versao.custo} PE</span>
    </div>
    <p className="text-sm leading-relaxed opacity-80 italic">{versao.descricao}</p>
  </div>
);
