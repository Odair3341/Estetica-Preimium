import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import PrimaryButton from '../components/PrimaryButton';

const Booking: React.FC = () => {
  const navigate = useNavigate();
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>('s1'); // Default selection for demo
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Facial');

  const categories = Array.from(new Set(SERVICES.map(s => s.category)));

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id);
  };

  const handleNext = () => {
    navigate('/booking/datetime');
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col text-gray-800 dark:text-gray-200 pb-20">
      <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pb-2 justify-between">
        <button onClick={() => navigate(-1)} className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-tight text-gray-900 dark:text-white flex-1 text-center">
          Agendar Serviço
        </h1>
        <div className="size-10"></div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* Page Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-2 pt-3 pb-5">
          <div className="h-2 flex-1 max-w-16 rounded-full bg-primary"></div>
          <div className="h-2 flex-1 max-w-16 rounded-full bg-primary/20 dark:bg-white/20"></div>
          <div className="h-2 flex-1 max-w-16 rounded-full bg-primary/20 dark:bg-white/20"></div>
        </div>

        <h2 className="text-gray-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight px-4 pb-3">
          Selecione o Serviço
        </h2>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <label className="flex flex-col min-w-40 h-14 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-full h-full">
              <div className="text-gray-500 dark:text-gray-400 flex border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark items-center justify-center pl-4 rounded-l-full border-r-0">
                <span className="material-symbols-outlined text-2xl">search</span>
              </div>
              <input
                className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-full text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-white/20 bg-background-light dark:bg-background-dark h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                placeholder="Buscar por um serviço"
              />
            </div>
          </label>
        </div>

        {/* Accordions */}
        <div className="flex flex-col px-4 gap-2">
          {categories.map((category) => (
            <details 
              key={category} 
              className="flex flex-col py-2 group bg-gray-500/5 dark:bg-white/5 rounded-2xl overflow-hidden transition-all"
              open={expandedCategory === category}
            >
              <summary 
                onClick={(e) => {
                  e.preventDefault();
                  toggleCategory(category);
                }}
                className="flex cursor-pointer items-center justify-between gap-6 py-3 px-4 list-none"
              >
                <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">{category}</p>
                <span className={`material-symbols-outlined text-gray-600 dark:text-gray-300 transition-transform ${expandedCategory === category ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </summary>
              
              {expandedCategory === category && (
                <div className="flex flex-col gap-2 px-4 pb-4">
                  {SERVICES.filter(s => s.category === category).map(service => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div 
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-primary/10 dark:bg-primary/20 border border-primary' 
                            : 'bg-gray-500/5 dark:bg-white/5 border border-transparent hover:border-primary/50'
                        }`}
                      >
                        <div className="flex flex-col">
                          <p className={`font-semibold ${isSelected ? 'text-primary' : 'text-gray-800 dark:text-gray-200'}`}>
                            {service.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            Duração: {service.duration} min | Preço: R$ {service.price.toFixed(2)}
                          </p>
                        </div>
                        {isSelected ? (
                          <div className="size-6 rounded-full bg-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-base">check</span>
                          </div>
                        ) : (
                          <div className="size-6 rounded-full border-2 border-gray-300 dark:border-gray-500"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </details>
          ))}

          {/* Fallback empty category */}
           <details className="flex flex-col py-2 group bg-gray-500/5 dark:bg-white/5 rounded-2xl overflow-hidden">
            <summary className="flex cursor-pointer items-center justify-between gap-6 py-3 px-4 list-none">
              <p className="text-gray-900 dark:text-white text-base font-semibold leading-normal">Depilação</p>
              <span className="material-symbols-outlined text-gray-600 dark:text-gray-300 transition-transform">expand_more</span>
            </summary>
            <div className="flex flex-col gap-2 px-4 pb-4">
               <p className="text-sm text-gray-600 dark:text-gray-400 p-2">Nenhum serviço disponível nesta categoria.</p>
            </div>
          </details>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8">
        <PrimaryButton 
          onClick={handleNext}
          disabled={!selectedServiceId}
          icon="arrow_forward"
        >
          Escolher Data e Hora
        </PrimaryButton>
      </footer>
    </div>
  );
};

export default Booking;