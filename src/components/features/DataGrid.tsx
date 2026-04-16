import { Ritual, Habilidade } from '../../types/ritual';

interface DataGridProps {
  data: (Ritual | Habilidade)[];
  activeSubView: 'rituais' | 'habilidades';
  selectedItem: Ritual | Habilidade | null;
  setSelectedItem: (item: any) => void;
  isRitual: (item: any) => item is Ritual;
}

export const DataGrid = ({ data, activeSubView, selectedItem, setSelectedItem, isRitual }: DataGridProps) => {
  return (
    <div className="flex-1 border border-app-border bg-black/20 overflow-auto custom-scrollbar min-h-0">
      <table className="w-full text-left border-collapse">
        <thead className="sticky top-0 bg-black z-10 border-b border-app-border">
          <tr className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50">
            <th className="p-4">Nome</th>
            {activeSubView === 'rituais' ? (
              <>
                <th className="p-4">Elemento</th>
                <th className="p-4">Círculo</th>
              </>
            ) : (
              <>
                <th className="p-4">Tipo</th>
                <th className="p-4">Categoria</th>
                <th className="p-4">Pré-Requisito</th>
              </>
            )}
            <th className="p-4 hidden md:table-cell">Fonte</th>
          </tr>
        </thead>
        <tbody className="text-xs uppercase tracking-wider">
          {data.map(item => (
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
                  <td className="p-4">{item.circulo}º</td>
                </>
              ) : (
                <>
                  <td className="p-4 opacity-70">{item.tipo}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 border border-app-border text-[9px]">
                      {item.categoria}
                    </span>
                  </td>
                  <td className="p-4">{item.requisito || '-'}</td>
                </>
              )}
              <td className="p-4 hidden md:table-cell opacity-50">{item.fonte}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
