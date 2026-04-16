import { motion, AnimatePresence } from 'motion/react';
import { ELEMENTS, CIRCLES, ABILITY_TYPES } from '../../constants';
import { Elemento, TipoHabilidade } from '../../types/ritual';

interface FilterBarProps {
  showFilters: boolean;
  activeSubView: 'rituais' | 'habilidades';
  selectedElements: Elemento[];
  setSelectedElements: (val: any) => void;
  selectedCircles: number[];
  setSelectedCircles: (val: any) => void;
  selectedAbilityTypes: TipoHabilidade[];
  setSelectedAbilityTypes: (val: any) => void;
  selectedSources: string[];
  setSelectedSources: (val: any) => void;
  sources: string[];
  toggleFilter: (list: any[], setList: any, item: any) => void;
}

export const FilterBar = ({
  showFilters,
  activeSubView,
  selectedElements,
  setSelectedElements,
  selectedCircles,
  setSelectedCircles,
  selectedAbilityTypes,
  setSelectedAbilityTypes,
  selectedSources,
  setSelectedSources,
  sources,
  toggleFilter
}: FilterBarProps) => {
  return (
    <AnimatePresence>
      {showFilters && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="border border-app-border bg-app-surface overflow-hidden shrink-0 mb-4"
        >
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeSubView === 'rituais' ? (
              <>
                <FilterGroup 
                  label="Elementos" 
                  items={ELEMENTS} 
                  selected={selectedElements} 
                  onToggle={(item) => toggleFilter(selectedElements, setSelectedElements, item)} 
                />
                <FilterGroup 
                  label="Círculos" 
                  items={CIRCLES} 
                  selected={selectedCircles} 
                  onToggle={(item) => toggleFilter(selectedCircles, setSelectedCircles, item)}
                  isCircle 
                />
              </>
            ) : (
              <FilterGroup 
                label="Tipo de Habilidade" 
                items={ABILITY_TYPES} 
                selected={selectedAbilityTypes} 
                onToggle={(item) => toggleFilter(selectedAbilityTypes, setSelectedAbilityTypes, item)} 
              />
            )}
            <FilterGroup 
              label="Fontes" 
              items={sources} 
              selected={selectedSources} 
              onToggle={(item) => toggleFilter(selectedSources, setSelectedSources, item)} 
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const FilterGroup = ({ label, items, selected, onToggle, isCircle = false }: any) => (
  <div className="space-y-3">
    <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">{label}</span>
    <div className="flex flex-wrap gap-2">
      {items.map((item: any) => (
        <button 
          key={item} 
          onClick={() => onToggle(item)}
          className={`
            ${isCircle ? 'w-10 h-10' : 'px-3 py-1.5'}
            text-[9px] uppercase font-bold border transition-all 
            ${selected.includes(item) 
              ? 'bg-app-accent text-black border-app-accent' 
              : 'border-white/10 opacity-50 hover:opacity-100'}
          `}
        >
          {item}{isCircle ? 'º' : ''}
        </button>
      ))}
    </div>
  </div>
);
