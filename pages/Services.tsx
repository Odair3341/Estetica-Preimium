import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { SERVICES } from '../constants';
import ServiceCard from '../components/ServiceCard';

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter services based on category and search query
  const filteredServices = useMemo(() => {
    let result = filter === 'Todos' 
      ? SERVICES 
      : SERVICES.filter(s => s.category === filter);
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.category.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [filter, searchQuery]);

  const categories = ['Todos', 'Facial', 'Corporal', 'Massagens', 'Depilação'];

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-20">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 px-4 py-3 backdrop-blur-sm dark:bg-background-dark/80">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <button onClick={() => navigate(-1)} className="text-neutral-800 dark:text-white">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
        </div>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-neutral-900 dark:text-white">
          Serviços Disponíveis
        </h1>
        <div className="flex size-12 shrink-0 items-center justify-end">
          <div className="relative flex h-12 w-12 items-center justify-center">
            <span className="material-symbols-outlined absolute left-3 text-neutral-800 dark:text-white">search</span>
            <input
              type="text"
              placeholder="Buscar serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-3 py-2 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-neutral-800 dark:text-white placeholder:text-neutral-500 dark:placeholder:text-zinc-400 w-full h-full"
            />
          </div>
        </div>
      </header>

      {/* Chips / Filters */}
      <div className="flex w-full gap-3 overflow-x-auto px-4 py-3 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-4 transition-colors ${
              filter === cat 
                ? 'bg-primary text-white' 
                : 'bg-primary/20 text-primary hover:bg-primary/30'
            }`}
          >
            <p className="text-sm font-medium leading-normal">{cat}</p>
          </button>
        ))}
      </div>

      {/* Service Cards List */}
      <main className="flex flex-col gap-4 p-4">
        {filteredServices.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onSelect={() => navigate('/booking')} 
          />
        ))}
      </main>

      <BottomNav />
    </div>
  );
};

export default Services;