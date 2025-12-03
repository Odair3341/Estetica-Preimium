import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const BookingDateTime: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  
  // Datas disponíveis (próximos 7 dias)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });
  
  // Horários disponíveis
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', 
    '17:00', '18:00', '19:00', '20:00'
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  const handleNext = () => {
    if (selectedDate && selectedTime) {
      navigate('/confirmation');
    }
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col text-gray-800 dark:text-gray-200 pb-20">
      <header className="sticky top-0 z-10 flex items-center bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm p-4 pb-2 justify-between">
        <button 
          onClick={() => navigate(-1)} 
          className="text-gray-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
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
          <div className="h-2 flex-1 max-w-16 rounded-full bg-primary"></div>
          <div className="h-2 flex-1 max-w-16 rounded-full bg-primary/20 dark:bg-white/20"></div>
        </div>

        <h2 className="text-gray-900 dark:text-white tracking-tight text-[28px] font-bold leading-tight px-4 pb-3">
          Selecione Data e Hora
        </h2>

        {/* Calendar Section */}
        <div className="px-4 pb-6">
          <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-normal pb-3">
            Data
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {availableDates.map((date, index) => {
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[70px] transition-all ${
                    isSelected
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  <span className="text-xs font-medium uppercase">
                    {formatDate(date).split(',')[0]}
                  </span>
                  <span className="text-lg font-bold">
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="px-4">
          <h3 className="text-gray-900 dark:text-white text-base font-semibold leading-normal pb-3">
            Horário
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time, index) => {
              const isSelected = selectedTime === time;
              return (
                <button
                  key={index}
                  onClick={() => setSelectedTime(time)}
                  disabled={!selectedDate}
                  className={`py-3 rounded-xl text-center transition-all ${
                    isSelected
                      ? 'bg-primary text-white'
                      : selectedDate
                      ? 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8">
        <PrimaryButton 
          onClick={handleNext}
          disabled={!selectedDate || !selectedTime}
          icon="arrow_forward"
        >
          Confirmar Agendamento
        </PrimaryButton>
      </footer>
    </div>
  );
};

export default BookingDateTime;