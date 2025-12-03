import React from 'react';
import { Appointment } from '../types';

interface AppointmentCardProps {
  appointment: Appointment;
  isPast?: boolean;
  onClick?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, isPast = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`flex gap-4 p-4 rounded-2xl shadow-sm border-l-4 cursor-pointer transition-all ${
        isPast 
          ? 'bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/50 opacity-75 grayscale hover:grayscale-0 hover:opacity-100' 
          : 'bg-white dark:bg-zinc-900 border-primary'
      }`}
    >
      <div className="flex flex-col items-center justify-center min-w-[3.5rem] p-2 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
        <span className="text-xs font-bold uppercase text-zinc-500 dark:text-zinc-400">
          {appointment.date.split(' ')[0].substring(0,3)}
        </span>
        <span className="text-lg font-bold text-zinc-900 dark:text-white">
          {isPast ? appointment.time : appointment.time.split(':')[0]}
        </span>
      </div>
      <div className="flex flex-col flex-grow justify-center">
        <h3 className="font-bold text-zinc-900 dark:text-white">{appointment.serviceName}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 flex items-center gap-1 mt-1">
          <span className="material-symbols-outlined text-sm">person</span>
          {appointment.professionalName}
        </p>
      </div>
      <div className="flex flex-col justify-center items-end">
        {appointment.price && <span className="font-bold text-primary text-sm">R$ {appointment.price}</span>}
        <span className={`text-xs mt-1 flex items-center ${
          isPast ? 'text-green-600 dark:text-green-400' : 'bg-primary/10 text-primary px-2 py-0.5 rounded-full'
        }`}>
          {isPast ? (
            <>
              <span className="material-symbols-outlined text-[10px] mr-0.5">check</span>
              Concluído
            </>
          ) : (
            'Confirmado'
          )}
        </span>
      </div>
    </div>
  );
};

export default AppointmentCard;