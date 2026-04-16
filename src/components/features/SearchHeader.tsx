import { Search, Filter } from 'lucide-react';

interface SearchHeaderProps {
  activeSubView: 'rituais' | 'habilidades';
  query: string;
  setQuery: (q: string) => void;
  showFilters: boolean;
  setShowFilters: (val: boolean) => void;
}

export const SearchHeader = ({ activeSubView, query, setQuery, showFilters, setShowFilters }: SearchHeaderProps) => (
  <div className="flex flex-col md:flex-row gap-4 shrink-0">
    <div className="flex-1 relative p-4 border border-app-border bg-app-surface flex items-center gap-4">
      <Search className="w-5 h-5 text-app-accent" />
      <input 
        type="text" 
        placeholder={activeSubView === 'rituais' ? "BUSCAR RITUAL..." : "BUSCAR HABILIDADE..."}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent border-none outline-none w-full uppercase text-xs tracking-widest placeholder:opacity-20"
      />
    </div>
    <button 
      onClick={() => setShowFilters(!showFilters)}
      className={`px-6 py-4 border border-app-border bg-app-surface text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/5 transition-all
        ${showFilters ? 'text-app-accent' : 'opacity-70'}`}
    >
      <Filter className="w-4 h-4" />
      Filtros
    </button>
  </div>
);
