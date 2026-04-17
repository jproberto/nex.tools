import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { Ritual, Habilidade } from '../../types/ritual';

interface DataGridProps {
  data: (Ritual | Habilidade)[];
  activeSubView: 'rituais' | 'habilidades';
  selectedItem: Ritual | Habilidade | null;
  setSelectedItem: (item: any) => void;
  isRitual: (item: any) => item is Ritual;
}

type SortConfig = {
  key: string;
  direction: 'asc' | 'desc';
} | null;

export const DataGrid = ({ data, activeSubView, selectedItem, setSelectedItem, isRitual }: DataGridProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'nome', direction: 'asc' });

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const aValue = (a as any)[sortConfig.key];
        const bValue = (b as any)[sortConfig.key];
        
        if (aValue === bValue) return 0;
        
        // Handle missing values
        if (aValue === undefined || aValue === null) return sortConfig.direction === 'asc' ? 1 : -1;
        if (bValue === undefined || bValue === null) return sortConfig.direction === 'asc' ? -1 : 1;

        // String comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        }

        // Number/Other comparison
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnKey: string) => {
    if (sortConfig?.key !== columnKey) {
      return <ArrowUpDown className="w-3 h-3 ml-1 opacity-20" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-3 h-3 ml-1" /> 
      : <ChevronDown className="w-3 h-3 ml-1" />;
  };

  const Th = ({ label, sortKey, className = "" }: { label: string, sortKey: string, className?: string }) => (
    <th 
      className={`p-4 cursor-pointer hover:bg-white/5 transition-colors select-none ${className}`}
      onClick={() => requestSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {getSortIcon(sortKey)}
      </div>
    </th>
  );

  return (
    <div className="flex-1 border border-app-border bg-black/20 overflow-auto custom-scrollbar min-h-0">
      <table className="w-full text-left border-collapse whitespace-nowrap">
        <thead className="sticky top-0 bg-black z-10 border-b border-app-border">
          <tr className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50">
            <Th label="Nome" sortKey="nome" />
            {activeSubView === 'rituais' ? (
              <>
                <Th label="Elemento" sortKey="elemento" />
                <Th label="Círculo" sortKey="circulo" />
              </>
            ) : (
              <>
                <Th label="Tipo" sortKey="tipo" />
                <Th label="Categoria" sortKey="categoria" />
                <Th label="Pré-Requisito" sortKey="requisito" />
              </>
            )}
            <Th label="Fonte" sortKey="fonte" className="hidden md:table-cell" />
          </tr>
        </thead>
        <tbody className="text-xs uppercase tracking-wider">
          {sortedData.map(item => (
            <tr 
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className={`cursor-pointer border-b border-white/5 transition-colors hover:bg-app-accent/5
                ${selectedItem?.id === item.id ? 'bg-app-accent/10' : ''}`}
            >
              <td className="p-4 font-bold">{item.nome}</td>
              {isRitual(item) ? (
                <>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-app-border text-[9px]">
                      {item.elemento}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-app-border text-[9px]">
                      {item.circulo}º
                    </span>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-app-border text-[9px] opacity-80">
                      {item.tipo}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-app-border text-[9px]">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="p-4">{item.requisito || '-'}</td>
                </>
              )}
              <td className="p-4 hidden md:table-cell">
                <span className="px-2 py-0.5 border border-app-border text-[9px] font-bold opacity-70">
                  {item.fonte}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
