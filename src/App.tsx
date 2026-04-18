/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Book, Zap, Info, Newspaper, Monitor, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Shared Components
import { DetailPanel } from './components/DetailPanel';
import { Navbar } from './components/layout/Navbar';
import { MobileNav } from './components/layout/MobileNav';
import { BackgroundGrid } from './components/layout/BackgroundGrid';
import { FilterBar } from './components/features/FilterBar';
import { DataGrid } from './components/features/DataGrid';
import { SubNav } from './components/features/SubNav';
import { SearchHeader } from './components/features/SearchHeader';
import { AboutView } from './components/views/AboutView';
import { ContentPlaceholder } from './components/views/ContentPlaceholder';

// Consts & Types
import { ELEMENTS, CIRCLES, ABILITY_TYPES } from './constants';
import type { Ritual, Elemento, Habilidade, TipoHabilidade } from './types/ritual';
import rituaisData from './data/rituais.json';
import habilidadesData from './data/habilidades.json';

const RITUAIS = rituaisData as Ritual[];
const HABILIDADES = habilidadesData as Habilidade[];
const SOURCES = Array.from(new Set([...RITUAIS.map(r => r.fonte), ...HABILIDADES.map(h => h.fonte)]));

type View = 'conteudo' | 'utilitarios' | 'modulos' | 'noticias' | 'sobre';
type SubView = 'rituais' | 'habilidades';

export default function NexTools() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeView, setActiveView] = useState<View>('conteudo');
  const [activeSubView, setActiveSubView] = useState<SubView>('rituais');
  const [selectedItem, setSelectedItem] = useState<Ritual | Habilidade | null>(null);

  // Sync state FROM URL on mount & location changes
  useEffect(() => {
    const path = location.pathname.split('/').filter(Boolean);
    
    if (path.length > 0) {
      const view = path[0] as string;
      if (['rituais', 'habilidades'].includes(view)) {
        setActiveView('conteudo');
        setActiveSubView(view as SubView);
        
        // Handle direct item selection (e.g. /rituais/alterar-destino)
        if (path.length > 1) {
          const itemId = path[1];
          if (view === 'rituais') {
            const found = RITUAIS.find(r => r.id === itemId);
            if (found) setSelectedItem(found);
          } else if (view === 'habilidades') {
            const found = HABILIDADES.find(h => h.id === itemId);
            if (found) setSelectedItem(found);
          }
        } else {
          setSelectedItem(null); // Ensure modal closes if navigating back to root /rituais
        }
      } else if (['utilitarios', 'modulos', 'noticias', 'sobre'].includes(view)) {
        setActiveView(view as View);
        setSelectedItem(null);
      }
    }
  }, [location.pathname]);

  // View state handlers that push to URL instead of just local state
  const handleViewChange = (view: View) => {
    if (view === 'conteudo') {
       navigate(`/${activeSubView}${location.search}`);
    } else {
       navigate(`/${view}`);
    }
  };

  const handleSubViewChange = (subview: SubView) => {
    navigate(`/${subview}${location.search}`);
  };

  const handleItemSelect = (item: Ritual | Habilidade | null) => {
    if (item) {
      navigate(`/${activeSubView}/${item.id}${location.search}`);
    } else {
      navigate(`/${activeSubView}${location.search}`);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  
  // URL synced filters
  const selectedElements = useMemo(() => searchParams.get('elementos')?.split(',') as Elemento[] || [], [searchParams]);
  const selectedCircles = useMemo(() => searchParams.get('circulos')?.split(',').map(Number) || [], [searchParams]);
  const selectedSources = useMemo(() => searchParams.get('fontes')?.split(',') || [], [searchParams]);
  const selectedAbilityTypes = useMemo(() => searchParams.get('tipos')?.split(',') as TipoHabilidade[] || [], [searchParams]);

  // Updating filters pushes to URL query params
  const updateFilterParams = (key: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (values.length > 0) {
      newParams.set(key, values.join(','));
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams, { replace: true });
  };

  const setSelectedElements = (val: Elemento[]) => updateFilterParams('elementos', val);
  const setSelectedCircles = (val: number[]) => updateFilterParams('circulos', val.map(String));
  const setSelectedSources = (val: string[]) => updateFilterParams('fontes', val);
  const setSelectedAbilityTypes = (val: TipoHabilidade[]) => updateFilterParams('tipos', val);

  useEffect(() => {
    const viewNames: Record<View, string> = {
      conteudo: 'Conteúdo',
      utilitarios: 'Utilitários',
      modulos: 'Módulos',
      noticias: 'Notícias',
      sobre: 'Sobre'
    };
    document.title = `nex.tools | ${viewNames[activeView]}`;
  }, [activeView]);

  const filteredData = useMemo(() => {
    if (activeSubView === 'rituais') {
      return RITUAIS.filter(r => {
        const matchesSearch = r.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            r.elemento.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesElement = selectedElements.length === 0 || r.elemento.some(e => selectedElements.includes(e));
        const matchesCircle = selectedCircles.length === 0 || selectedCircles.includes(r.circulo);
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(r.fonte);
        return matchesSearch && matchesElement && matchesCircle && matchesSource;
      });
    } else {
      return HABILIDADES.filter(h => {
        const matchesSearch = h.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            h.categoria.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = selectedAbilityTypes.length === 0 || selectedAbilityTypes.includes(h.tipo);
        const matchesSource = selectedSources.length === 0 || selectedSources.includes(h.fonte);
        return matchesSearch && matchesType && matchesSource;
      });
    }
  }, [activeSubView, searchQuery, selectedElements, selectedCircles, selectedSources, selectedAbilityTypes]);

  const toggleFilter = <T,>(list: T[], setList: (val: T[]) => void, item: T) => {
    setList(list.includes(item) ? list.filter(i => i !== item) : [...list, item]);
  };

  const navItems = [
    { id: 'conteudo', label: 'Conteúdo', icon: <Book className="w-4 h-4" /> },
    { id: 'utilitarios', label: 'Utilitários', icon: <Zap className="w-4 h-4" /> },
    { id: 'modulos', label: 'Módulos', icon: <Monitor className="w-4 h-4" /> },
    { id: 'noticias', label: 'Notícias', icon: <Newspaper className="w-4 h-4" /> },
    { id: 'sobre', label: 'Sobre', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-app-bg text-app-text font-display selection:bg-app-accent selection:text-black flex flex-col h-screen overflow-hidden">
      <BackgroundGrid />
      <Navbar navItems={navItems} activeView={activeView} setActiveView={handleViewChange} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <MobileNav isOpen={isMenuOpen} navItems={navItems} activeView={activeView} setActiveView={handleViewChange} setMenuOpen={setIsMenuOpen} />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 overflow-hidden min-h-0 flex flex-col">
        <AnimatePresence mode="wait">
          {activeView === 'conteudo' && (
            <motion.div 
              key="conteudo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="flex-1 flex flex-col gap-6 overflow-hidden min-h-0"
            >
              <SubNav activeSubView={activeSubView} setActiveSubView={handleSubViewChange} />

              <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden min-h-0">
                <div className="flex-1 flex flex-col gap-4 min-w-0 overflow-hidden">
                  <SearchHeader activeSubView={activeSubView} query={searchQuery} setQuery={setSearchQuery} showFilters={showFilters} setShowFilters={setShowFilters} />
                  <FilterBar 
                    showFilters={showFilters} activeSubView={activeSubView} selectedElements={selectedElements} setSelectedElements={setSelectedElements}
                    selectedCircles={selectedCircles} setSelectedCircles={setSelectedCircles} selectedAbilityTypes={selectedAbilityTypes} 
                    setSelectedAbilityTypes={setSelectedAbilityTypes} selectedSources={selectedSources} setSelectedSources={setSelectedSources}
                    sources={SOURCES} toggleFilter={toggleFilter}
                  />
                  <DataGrid data={filteredData} activeSubView={activeSubView} selectedItem={selectedItem} setSelectedItem={handleItemSelect} isRitual={(i): i is Ritual => 'circulo' in i} />
                </div>

                <AnimatePresence>
                  {selectedItem && (
                    <motion.div 
                      key="detail-panel" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      className="fixed inset-0 z-[60] lg:relative lg:inset-auto lg:z-0 w-full lg:w-[450px] border border-app-border bg-black lg:bg-app-surface backdrop-blur-sm overflow-auto custom-scrollbar"
                    >
                      <button onClick={() => handleItemSelect(null)} className="lg:hidden absolute top-4 right-4 p-2 bg-app-accent text-black z-10"><X className="w-6 h-6" /></button>
                      <DetailPanel item={selectedItem} onClose={() => handleItemSelect(null)} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeView === 'sobre' && <AboutView />}
          {['utilitarios', 'modulos', 'noticias'].includes(activeView) && <ContentPlaceholder />}
        </AnimatePresence>
      </main>
    </div>
  );
}
