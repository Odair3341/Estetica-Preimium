import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CURRENT_USER } from '../constants';
import PrimaryButton from '../components/PrimaryButton';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(CURRENT_USER.name);
  const [phone, setPhone] = useState(CURRENT_USER.phone);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    
    if (!email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\) \d{5}-\d{4}$/.test(phone)) {
      newErrors.phone = 'Telefone inválido';
    }
    
    return newErrors;
  };

  const handleSave = () => {
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Simulate save
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/80 p-4 pb-2 backdrop-blur-sm dark:bg-background-dark/80">
        <div className="flex size-12 shrink-0 items-center justify-start">
          <button onClick={() => navigate(-1)} className="material-symbols-outlined text-zinc-900 dark:text-white">
            arrow_back_ios_new
          </button>
        </div>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-white">
          Meu Perfil
        </h1>
        <div className="flex w-12 items-center justify-end">
          <PrimaryButton 
            onClick={handleSave}
            className="h-10 text-sm"
          >
            Salvar
          </PrimaryButton>
        </div>
      </header>

      <main className="flex flex-col gap-8 p-4">
        {/* Profile Header */}
        <section className="flex w-full flex-col items-center gap-4">
          <div className="relative group">
            <div
              className="h-32 w-32 rounded-full bg-cover bg-center bg-no-repeat border-4 border-white dark:border-zinc-800 shadow-xl"
              style={{ backgroundImage: `url('${CURRENT_USER.avatarUrl}')` }}
            ></div>
            <button className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-md hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-xl">edit</span>
            </button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-zinc-900 dark:text-white">
              {CURRENT_USER.name}
            </p>
            <p className="text-base font-normal leading-normal text-zinc-500 dark:text-zinc-400">
              {CURRENT_USER.email}
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ml-1">
            Informações Pessoais
          </h2>
          <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-800/50 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <label className="flex flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-zinc-900 dark:text-white">
                Nome Completo
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) {
                    setErrors(prev => ({ ...prev, name: '' }));
                  }
                }}
                className={`flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl p-[15px] text-base font-normal leading-normal transition-colors ${
                  errors.name 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-zinc-200 bg-zinc-50 focus:border-primary focus:outline-0 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900/50 dark:focus:border-primary'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </label>
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <label className="flex flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-zinc-900 dark:text-white">
                Telefone
              </p>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) {
                    setErrors(prev => ({ ...prev, phone: '' }));
                  }
                }}
                className={`flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl p-[15px] text-base font-normal leading-normal transition-colors ${
                  errors.phone 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-zinc-200 bg-zinc-50 focus:border-primary focus:outline-0 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900/50 dark:focus:border-primary'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </label>
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <label className="flex flex-col">
              <p className="pb-2 text-base font-medium leading-normal text-zinc-900 dark:text-white">
                E-mail
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) {
                    setErrors(prev => ({ ...prev, email: '' }));
                  }
                }}
                className={`flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl p-[15px] text-base font-normal leading-normal transition-colors ${
                  errors.email 
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                    : 'border-zinc-200 bg-zinc-50 focus:border-primary focus:outline-0 focus:ring-0 dark:border-zinc-700 dark:bg-zinc-900/50 dark:focus:border-primary'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </label>
          </div>
        </section>

        {/* Preferences Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ml-1">
            Preferências
          </h2>
          <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-800/50 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center justify-between py-2">
              <p className="text-base font-medium text-zinc-900 dark:text-white">Receber Notificações</p>
              <div className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-primary transition-colors">
                <input defaultChecked className="peer sr-only" id="notifications-toggle" type="checkbox" />
                <span className="absolute left-1.5 h-5 w-5 rounded-full bg-white transition-transform peer-checked:translate-x-6"></span>
              </div>
            </div>
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <button className="flex items-center justify-between text-left py-2 group">
              <p className="text-base font-medium text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Endereços Salvos</p>
              <span className="material-symbols-outlined text-zinc-400 dark:text-zinc-500 group-hover:text-primary">chevron_right</span>
            </button>
          </div>
        </section>

        {/* Account and Security Section */}
        <section className="flex flex-col gap-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 ml-1">
            Segurança e Conta
          </h2>
          <div className="flex flex-col gap-3 rounded-2xl bg-white dark:bg-zinc-800/50 p-4 shadow-sm border border-zinc-100 dark:border-zinc-800">
            <button className="flex items-center justify-between text-left py-2 group">
              <p className="text-base font-medium text-zinc-900 dark:text-white group-hover:text-primary transition-colors">Alterar Senha</p>
              <span className="material-symbols-outlined text-zinc-400 dark:text-zinc-500 group-hover:text-primary">chevron_right</span>
            </button>
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-between text-left py-2 group"
            >
              <p className="text-base font-medium text-primary group-hover:opacity-80">Sair</p>
            </button>
            <hr className="border-zinc-200 dark:border-zinc-700" />
            <button className="flex items-center justify-between text-left py-2 group">
              <p className="text-base font-medium text-red-500 group-hover:opacity-80">Excluir Conta</p>
            </button>
          </div>
        </section>

        <footer className="py-4 text-center">
          <a href="#" className="text-sm text-zinc-500 underline dark:text-zinc-400 hover:text-primary">
            Política de Privacidade
          </a>
        </footer>
      </main>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            <span className="font-medium text-sm">Perfil atualizado com sucesso!</span>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Profile;