import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, Client } from '../types';
import PrimaryButton from '../components/PrimaryButton';
import { post, get } from '../utils/api';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  // Estado para busca de cliente
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [scheduleEnabled, setScheduleEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState<string>('');
  const [scheduleTime, setScheduleTime] = useState<string>('');
  const [scheduleProfessional, setScheduleProfessional] = useState<string>('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    // Carregar clientes iniciais (para o usuário ver quem existe)
    fetchInitialClients();
  }, []);

  const fetchInitialClients = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/clients');
      if (response.ok) {
        const data = await response.json();
        // Pegar apenas os primeiros 10 para não poluir
        setSearchResults(data.slice(0, 10));
      }
    } catch (error) {
      console.error('Erro ao buscar clientes iniciais:', error);
    }
  };

  // Efeito para buscar clientes com debounce
  useEffect(() => {
    if (searchQuery.length === 0) {
      fetchInitialClients();
      return;
    }

    if (searchQuery.length < 2) { // Reduzi para 2 caracteres para facilitar
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`http://localhost:3001/api/clients/search?q=${searchQuery}`);
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        }
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const updateQuantity = (id: string, change: number) => {
    const newItems = items.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + change) };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
  };

  const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    if (!selectedClient) {
      alert('Por favor, selecione um cliente para finalizar a venda.');
      return;
    }

    if (scheduleEnabled) {
      if (!scheduleDate || !scheduleTime || !scheduleProfessional) {
        alert('Para agendar, preencha Data, Hora e Profissional.');
        return;
      }
    }

    try {
      // Criar registro de histórico de compra para cada item
      // Em um cenário real, faríamos um endpoint de "venda" que lida com tudo em transação
      // Aqui vamos simular chamando o endpoint de histórico
      const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

      // Processar cada item do carrinho
      for (const item of items) {
        const bodyData: any = {
          client_id: selectedClient.id,
          amount: item.price * item.quantity,
          date: date,
          type: item.type || 'product',
          quantity: item.quantity
        };

        // Vincular o ID correto dependendo do tipo
        if (item.type === 'service') {
          // Assumindo que item.id para services é numérico ou string de número
          bodyData.service_id = parseInt(item.id);
        } else {
          // Assumindo p1, p2... remove 'p'
          bodyData.product_id = parseInt(item.id.replace('p', ''));
        }

        await post('/api/purchase-history', bodyData);

        // Se for serviço e agendamento estiver habilitado, criar agendamento
        if (item.type === 'service' && scheduleEnabled && scheduleDate && scheduleTime && scheduleProfessional) {
          const aptPayload = {
            client_id: selectedClient.id,
            procedure_id: parseInt(item.id),
            professional_name: scheduleProfessional,
            date: scheduleDate,
            time: scheduleTime,
            status: 'upcoming' as const,
            price: item.price
          };
          await post('/api/appointments', aptPayload);
        }
      }

      // Confirmar agendamentos criados (se habilitado)
      if (scheduleEnabled) {
        try {
          const res = await get(`/api/appointments/client/${selectedClient.id}`);
          if (!res.ok) throw new Error('Falha ao confirmar agendamentos');
        } catch {}
      }
      setShowSuccess(true);
      // Clear cart after delay
      setTimeout(() => {
        localStorage.removeItem('cart');
        setItems([]);
        navigate(scheduleEnabled ? '/schedule' : '/dashboard');
      }, 2500);
    } catch (error) {
      console.error('Erro ao finalizar venda:', error);
      alert('Erro ao processar a venda. Tente novamente.');
    }
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-bounce">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Compra Realizada!</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center">
          Venda registrada para {selectedClient?.name}.<br/>
          Seu pedido foi processado com sucesso.
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => navigate('/schedule')} className="px-4 py-2 rounded-full bg-primary text-white font-bold">Ver Agenda</button>
          <button onClick={() => navigate('/management')} className="px-4 py-2 rounded-full bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold">Ver Gestão</button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-40">
      <header className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between sticky top-0 z-10 border-b border-zinc-200 dark:border-zinc-800">
        <button onClick={() => navigate(-1)} className="text-gray-800 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/5">
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <h1 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">
          Carrinho
        </h1>
      </header>

      <main className="flex-grow p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] opacity-50">
            <span className="material-symbols-outlined text-6xl mb-4">production_quantity_limits</span>
            <p className="text-lg font-medium">Seu carrinho está vazio</p>
            <button
              onClick={() => navigate('/store')}
              className="mt-6 text-primary font-bold underline"
            >
              Ir para a Loja
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {/* Seleção de Cliente */}
            <section className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">person</span>
                Cliente
              </h3>

              {selectedClient ? (
                <div className="flex items-center justify-between bg-primary/10 p-3 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-bold text-zinc-900 dark:text-white">{selectedClient.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{selectedClient.email}</p>
                  </div>
                  <button
                    onClick={() => { setSelectedClient(null); setSearchQuery(''); }}
                    className="text-primary hover:bg-primary/10 p-2 rounded-full"
                  >
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
              ) : (
                <div className="relative">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-zinc-400">search</span>
                    <input
                      type="text"
                      placeholder="Buscar cliente (nome, email ou tel)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 focus:ring-2 focus:ring-primary/50 outline-none transition-all"
                    />
                    {isSearching && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 size-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                    )}
                  </div>

                  {/* Resultados da busca */}
                  {!selectedClient && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 z-20 max-h-60 overflow-y-auto">
                      {searchResults.length > 0 ? (
                        searchResults.map(client => (
                          <button
                            key={client.id}
                            onClick={() => {
                              setSelectedClient(client);
                              // setSearchResults([]); // Comentei para manter a lista disponível se ele remover
                            }}
                            className="w-full text-left p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 flex flex-col"
                          >
                            <span className="font-bold text-sm text-zinc-900 dark:text-white">{client.name}</span>
                            <span className="text-xs text-zinc-500">{client.email} • {client.phone}</span>
                          </button>
                        ))
                      ) : (
                        searchQuery.length >= 2 && !isSearching && (
                          <div className="p-3 text-sm text-zinc-500 text-center">Nenhum cliente encontrado</div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Agendamento (para serviços) */}
            {items.some(i => i.type === 'service') && (
              <section className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm border border-zinc-100 dark:border-zinc-800/50">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">event</span>
                  Agendamento do Serviço
                </h3>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Criar agendamento ao finalizar</p>
                  <button
                    onClick={() => setScheduleEnabled(!scheduleEnabled)}
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${scheduleEnabled ? 'bg-primary text-white border-primary' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'}`}
                  >
                    {scheduleEnabled ? 'Ativado' : 'Desativado'}
                  </button>
                </div>
                {scheduleEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Data</label>
                      <input type="date" value={scheduleDate} onChange={(e) => setScheduleDate(e.target.value)} className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Hora</label>
                      <input type="time" value={scheduleTime} onChange={(e) => setScheduleTime(e.target.value)} className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1">Profissional</label>
                      <input type="text" value={scheduleProfessional} onChange={(e) => setScheduleProfessional(e.target.value)} placeholder="Nome do profissional" className="w-full p-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white" />
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* Lista de Itens */}
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-zinc-900 dark:text-white px-1">Itens do Pedido</h3>
              {items.map(item => (
                <div key={item.id} className="flex gap-4 p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800/50">
                  <div
                    className="h-24 w-20 rounded-lg bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url("${item.imageUrl}")` }}
                  ></div>
                  <div className="flex flex-col flex-grow justify-between py-1">
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.category}</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <span className="font-bold text-primary">R$ {item.price.toFixed(2)}</span>
                      <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800 rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="size-6 flex items-center justify-center text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="text-sm font-bold min-w-[1rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="size-6 flex items-center justify-center text-zinc-600 dark:text-zinc-400"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {items.length > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 z-20 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-zinc-500 dark:text-zinc-400">Total</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white">R$ {total.toFixed(2)}</span>
          </div>
          <PrimaryButton
            onClick={handleCheckout}
            icon="arrow_forward"
            disabled={!selectedClient}
            className={!selectedClient ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {selectedClient ? 'Finalizar Compra' : 'Selecione um Cliente'}
          </PrimaryButton>
        </footer>
      )}
    </div>
  );
};

export default Cart;
