import React from 'react';
import { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (id: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div 
      key={service.id} 
      className="flex items-stretch justify-between gap-4 rounded-lg bg-white p-4 shadow-sm dark:bg-black/20 border border-transparent dark:border-white/5"
    >
      <div className="flex flex-[2_2_0px] flex-col justify-between gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-base font-bold leading-tight text-neutral-900 dark:text-white">
            {service.name}
          </p>
          <p className="text-sm font-normal leading-normal text-neutral-500 dark:text-neutral-400">
            Duração: {service.duration} min • Preço: R$ {service.price}
          </p>
        </div>
        <button 
          onClick={() => onSelect(service.id)}
          className="flex w-fit min-w-[84px] cursor-pointer items-center justify-center rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium leading-normal text-primary hover:bg-primary/30 transition-colors"
        >
          <span>Ver Detalhes</span>
        </button>
      </div>
      {service.imageUrl && (
        <div
          className="aspect-square w-24 flex-1 rounded-lg bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${service.imageUrl}")` }}
        ></div>
      )}
    </div>
  );
};

export default ServiceCard;