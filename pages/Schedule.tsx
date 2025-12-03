import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Appointment } from '../types';
import { get } from '../utils/api';
import AppointmentCard from '../components/AppointmentCard';

const Schedule: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      setIsLoading(true);
      try {
        const res = await get('/api/appointments');
        if (res.ok) {
          const data = await res.json();
          setAppointments(data);
        } else {
          setAppointments([]);
        }
      } catch (e) {
        console.error('Erro ao carregar agendamentos:', e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24">
      <header className="sticky top-0 z-10 flex flex-col bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-4 px-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Minha Agenda</h1>
        
        <div className="flex p-1 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'upcoming' 
                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Próximos
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
              activeTab === 'history' 
                ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' 
                : 'text-zinc-500 dark:text-zinc-400'
            }`}
          >
            Histórico
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 flex flex-col gap-4">
        {activeTab === 'upcoming' ? (
          <>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">hourglass</span>
                <p>Carregando...</p>
              </div>
            ) : appointments.filter(a => a.status === 'upcoming').length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">event_busy</span>
                <p>Nenhum agendamento futuro</p>
              </div>
            ) : (
              appointments.filter(a => a.status === 'upcoming').map(apt => (
                <AppointmentCard 
                  key={apt.id} 
                  appointment={{
                    id: String(apt.id),
                    serviceName: apt.procedure_id ? `Procedimento #${apt.procedure_id}` : 'Serviço',
                    date: apt.date,
                    time: apt.time,
                    professionalName: apt.professional_name || 'Profissional',
                    price: Number(apt.price || 0)
                  } as any} 
                  onClick={() => navigate('/booking')} 
                />
              ))
            )}
            
            <button 
              onClick={() => navigate('/booking')}
              className="mt-4 w-full py-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-2xl text-zinc-500 dark:text-zinc-400 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Novo Agendamento
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">hourglass</span>
                <p>Carregando...</p>
              </div>
            ) : appointments.filter(a => a.status !== 'upcoming').length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">history</span>
                <p>Sem histórico</p>
              </div>
            ) : (
              appointments.filter(a => a.status !== 'upcoming').map(apt => (
                <AppointmentCard 
                  key={apt.id as any} 
                  appointment={{
                    id: String(apt.id),
                    serviceName: apt.procedure_id ? `Procedimento #${apt.procedure_id}` : 'Serviço',
                    date: apt.date,
                    time: apt.time,
                    professionalName: apt.professional_name || 'Profissional',
                    price: Number(apt.price || 0)
                  } as any}
                  isPast={true}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Floating Action Button for Booking */}
      <button 
        onClick={() => navigate('/booking')}
        className="fixed bottom-24 right-4 h-14 w-14 bg-primary text-white rounded-full shadow-lg shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-all z-40"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      <BottomNav />
    </div>
  );
};

export default Schedule;
