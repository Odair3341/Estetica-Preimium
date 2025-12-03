import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryButton from '../components/PrimaryButton';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }
    
    // Simulate API call
    setIsLoading(true);
    setError('');
    
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden antialiased p-4 pt-16 pb-8">
      <div className="flex flex-col items-center justify-start w-full mb-8">
        <div className="mb-8 p-4 bg-primary/10 rounded-full">
           <svg className="text-primary w-12 h-12" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"></path>
          </svg>
        </div>
        <h1 className="text-stone-900 dark:text-white tracking-tight text-[32px] font-bold leading-tight text-center pb-2">
          Bem-vinda de volta
        </h1>
        <p className="text-stone-600 dark:text-stone-300 text-base font-normal leading-normal text-center">
          Acesse sua conta para continuar
        </p>
      </div>

      {/* Tabs */}
      <div className="flex w-full mb-6">
        <div className="flex h-12 flex-1 items-center justify-center rounded-full bg-black/5 dark:bg-white/5 p-1">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex cursor-pointer h-full grow items-center justify-center rounded-full px-2 text-sm font-medium leading-normal transition-all duration-200 ${
              activeTab === 'login'
                ? 'bg-white dark:bg-black/20 shadow-sm text-stone-900 dark:text-white'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`flex cursor-pointer h-full grow items-center justify-center rounded-full px-2 text-sm font-medium leading-normal transition-all duration-200 ${
              activeTab === 'register'
                ? 'bg-white dark:bg-black/20 shadow-sm text-stone-900 dark:text-white'
                : 'text-stone-500 dark:text-stone-400'
            }`}
          >
            Cadastrar
          </button>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3 mb-2">
            <p className="text-red-700 dark:text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}
        
        <label className="flex flex-col w-full">
          <p className="text-stone-900 dark:text-white text-base font-medium leading-normal pb-2">
            E-mail ou Telefone
          </p>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError('');
            }}
            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-stone-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/50 h-14 placeholder:text-stone-400 dark:placeholder:text-stone-500 p-[15px] text-base font-normal leading-normal transition-colors duration-200"
            placeholder="Digite seu e-mail ou telefone"
          />
        </label>
        <label className="flex flex-col w-full">
          <p className="text-stone-900 dark:text-white text-base font-medium leading-normal pb-2">
            Senha
          </p>
          <div className="relative flex w-full flex-1 items-stretch">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-stone-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/50 h-14 placeholder:text-stone-400 dark:placeholder:text-stone-500 p-[15px] pr-12 text-base font-normal leading-normal transition-colors duration-200"
              placeholder="Digite sua senha"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center justify-center pr-4 text-stone-400 dark:text-stone-500 hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              <span className="material-symbols-outlined">
                {showPassword ? 'visibility_off' : 'visibility'}
              </span>
            </button>
          </div>
        </label>

        <div className="text-right">
          <a href="#" className="text-primary text-sm font-medium hover:underline">
            Esqueci minha senha
          </a>
        </div>

        <PrimaryButton
          type="submit"
          disabled={isLoading}
          className="mt-4"
        >
          {isLoading ? (
            <>
              <span className="material-symbols-outlined animate-spin mr-2">progress_activity</span>
              Processando...
            </>
          ) : (
            activeTab === 'login' ? 'Entrar' : 'Cadastrar'
          )}
        </PrimaryButton>
      </form>

      <div className="flex items-center gap-4 py-8">
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800"></div>
        <p className="text-sm text-stone-500 dark:text-stone-400">Ou entre com</p>
        <div className="h-px flex-1 bg-stone-200 dark:bg-stone-800"></div>
      </div>

      <div className="flex justify-center gap-4 pb-8">
        <button className="flex items-center justify-center w-14 h-14 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200">
          <img
            alt="Google logo"
            className="h-6 w-6"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJrIqcMsu1k6yILDn7ju3e5PcwJPg2-UDH6_SfBVAGxIDQPi2t2QdezirPYDj_W8G1K6L-P7XOTnwYy4a5eXntHNzmfdyJLj7GgKv2ldd-WkJSZ0Fq7AOESzYO3-GC3mJ33Z6QNNdoKV8ewuEcUJ4HNsLqTpHXsRs_DNClMIbksgkJpzQbXTYNdaWQkm8c7qO66flXvEFmzn8RsSC88yfQMvzzCx3GzxDu_fOSc1NvZWInr9xtqlPnZs89ZbGpo8gjiDWgPwh6Cv4"
          />
        </button>
        <button className="flex items-center justify-center w-14 h-14 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200">
          <img
            alt="Apple logo"
            className="h-6 w-6 dark:invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXqJCHMhgoYan7vKVUbpWHtWbn5F-41GWACAQcgd2QuzhbLNEnxru2Z9tZYOJrg6DmMl6zrEIybC2JseuLdHUO9-Z8iT-XcRSYQKMKExd5exHiJr9m6ohEoNGTcEOfIeAWTYkZFGLMZlKfxQr0bZM-z4GV-hdB1Irqekx48wXQhE5sbDxSM59T-u96YcZP1nJLLJM4fzVredf4duOvOB7wRMIFwde71cCviky701CUVg_VU3jh__4P2PLlJzjTbpMVDddvg2JWjNE"
          />
        </button>
        <button className="flex items-center justify-center w-14 h-14 rounded-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200">
          <img
            alt="Facebook logo"
            className="h-6 w-6"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeS419XL-s1gchgSwqWRPtY1QUOpLro8TcEPPn5KTFp7_e1le1HD6bWTQ-4ryfDWYT1jS6jBeycQ3jj3QSMo2TVDJY1oJX5WqFaNkHpCkfteCW_uXJnu52bK7aaTakSutkifeq9rF1VUSoj2LktdHEBTtPaSTW6iSYGun0YunYMDrtGG36wDgLvH2h1WbM19U7fbhKzAAxUnc2NIpn0zRpnBclRYSuUf4Ow5ycKwKEHelK7FtmRFTHy0rNMd6YZDTt8vgJ5JZqmPE"
          />
        </button>
      </div>

      <div className="text-center mt-auto">
        <p className="text-sm text-stone-500 dark:text-stone-400">
          Não tem uma conta?{' '}
          <a href="#" className="font-bold text-primary hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;