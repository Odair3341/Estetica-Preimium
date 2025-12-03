import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleConfirm = () => {
    setShowSuccess(true);
    // Navigate to dashboard after delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-bounce">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Agendamento Confirmado!</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center">
          Seu agendamento foi registrado com sucesso. <br/> Você receberá a confirmação em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-20">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-gray-800 dark:text-white flex size-12 shrink-0 items-center justify-center">
          <span className="material-symbols-outlined text-2xl">arrow_back_ios_new</span>
        </button>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
          Confirmação
        </h1>
      </header>

      <main className="flex-grow flex flex-col px-4">
        <div className="w-full flex justify-center pt-8 pb-6">
          <div className="flex items-center justify-center size-24 bg-primary/20 rounded-full animate-pulse">
            <div className="flex items-center justify-center size-[72px] bg-primary rounded-full">
              <span className="material-symbols-outlined text-white text-5xl font-bold">done</span>
            </div>
          </div>
        </div>

        <h2 className="text-gray-900 dark:text-white tracking-light text-[28px] font-bold leading-tight text-center pb-2">
          Revise os detalhes
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-base font-normal leading-normal pb-8 text-center">
          Confira se todas as informações do seu agendamento estão corretas.
        </p>

        <div className="flex flex-col gap-2 bg-white dark:bg-gray-800/20 rounded-2xl p-4 mb-4 border border-zinc-100 dark:border-zinc-800">
          {/* Item 1 */}
          <div className="flex items-center gap-4 py-3">
            <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-12">
              <span className="material-symbols-outlined">cut</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Serviço</p>
              <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Serviço Selecionado
              </p>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-700/60" />
          
          {/* Item 2 */}
          <div className="flex items-center gap-4 py-3">
            <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-12">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Profissional</p>
              <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Profissional
              </p>
            </div>
          </div>
          <hr className="border-gray-200 dark:border-gray-700/60" />

          {/* Item 3 */}
          <div className="flex items-center gap-4 py-3">
            <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-12">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">Data & Hora</p>
              <p className="text-gray-900 dark:text-white text-base font-medium leading-normal">
                Data e Hora
              </p>
            </div>
          </div>
        </div>

        <button className="flex items-center justify-center gap-3 w-full h-14 rounded-2xl bg-primary/10 hover:bg-primary/20 active:bg-primary/30 transition-colors duration-200 mb-8 border border-primary/20">
          <span className="material-symbols-outlined text-primary">add_to_photos</span>
          <span className="text-primary text-base font-bold">Adicionar ao Calendário</span>
        </button>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 w-full p-4 bg-background-light dark:bg-background-dark pt-4">
        <PrimaryButton 
          onClick={handleConfirm}
        >
          Confirmar Agendamento
        </PrimaryButton>
      </footer>
    </div>
  );
};

export default Confirmation;