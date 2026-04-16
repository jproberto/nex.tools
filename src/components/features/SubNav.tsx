interface SubNavProps {
  activeSubView: 'rituais' | 'habilidades';
  setActiveSubView: (v: 'rituais' | 'habilidades') => void;
}

export const SubNav = ({ activeSubView, setActiveSubView }: SubNavProps) => (
  <div className="flex gap-2 border-b border-app-border/30 shrink-0">
    {(['rituais', 'habilidades'] as const).map(v => (
      <button 
        key={v}
        onClick={() => setActiveSubView(v)}
        className={`px-6 py-3 text-xs uppercase font-black tracking-widest transition-all
          ${activeSubView === v ? 'text-app-accent border-b-2 border-app-accent' : 'opacity-40 hover:opacity-100'}`}
      >
        {v}
      </button>
    ))}
  </div>
);
