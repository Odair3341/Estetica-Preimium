import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { CURRENT_USER } from '../constants';
import { get } from '../src/utils/api';
import FinanceCard from '../components/FinanceCard';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const today = new Date().toISOString().split('T')[0];
  const [appointments, setAppointments] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [purchaseHistory, setPurchaseHistory] = React.useState<any[]>([]);
  const totalIncome = purchaseHistory
    .filter((h) => h.date === today)
    .reduce((sum, h) => sum + Number(h.amount), 0);
  const totalExpenses = 0;
  const balance = totalIncome - totalExpenses;

  React.useEffect(() => {
    const fetchAll = async () => {
      try {
        const [aptsRes, productsRes, historyRes] = await Promise.all([
          get('/api/appointments').catch(() => null),
          get('/api/products'),
          get('/api/purchase-history')
        ]);
        if (aptsRes && aptsRes.ok) {
          setAppointments(await aptsRes.json());
        } else {
          setAppointments([]);
        }
        setProducts(await productsRes.json());
        setPurchaseHistory(await historyRes.json());
      } catch (e) {
        console.error('Erro ao carregar dados do Dashboard:', e);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-20">
      {/* Top App Bar */}
      <header className="flex items-center p-4 pb-2 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-primary"
            style={{ backgroundImage: `url("${CURRENT_USER.avatarUrl}")` }}
          ></div>
          <div className="flex flex-col">
            <h1 className="text-zinc-900 dark:text-white text-lg font-bold leading-none tracking-[-0.015em]">
              Olá, {CURRENT_USER.name.split(' ')[0]}!
            </h1>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Bem-vinda de volta</p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3">
          <div className="flex items-center bg-white dark:bg-zinc-800 rounded-full px-3 py-1 border border-zinc-200 dark:border-zinc-700 shadow-sm">
            <span className="material-symbols-outlined text-primary text-sm mr-1">diamond</span>
            <span className="text-xs font-bold text-zinc-800 dark:text-white">{CURRENT_USER.loyaltyPoints} pts</span>
          </div>
          <button className="flex items-center justify-center rounded-full h-10 w-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors relative shadow-sm">
            <span className="material-symbols-outlined text-xl">notifications</span>
            <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-zinc-800"></span>
          </button>
        </div>
      </header>

      <main className="flex-grow px-4 flex flex-col gap-6">

        {/* Financial Summary */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          <FinanceCard
            title="Receitas"
            value={`R$ ${totalIncome.toFixed(2)}`}
            color="green"
            icon="trending_up"
          />
          <FinanceCard
            title="Despesas"
            value={`R$ ${totalExpenses.toFixed(2)}`}
            color="red"
            icon="trending_down"
          />
          <FinanceCard
            title="Saldo"
            value={`R$ ${balance.toFixed(2)}`}
            color="blue"
            icon="account_balance_wallet"
          />
        </div>

        {/* Banner/Offers */}
        <div className="mt-4 rounded-3xl bg-gradient-to-br from-primary to-purple-600 p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 size-40 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute -left-8 -bottom-8 size-32 rounded-full bg-black/10 blur-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Semana da Beleza</h3>
                <p className="text-sm opacity-90 mb-4 max-w-[80%] leading-relaxed">Agende 3 serviços e ganhe 15% de desconto em qualquer peça da loja!</p>
              </div>
              <span className="material-symbols-outlined text-4xl opacity-50">hotel_class</span>
            </div>
            <button
              onClick={() => navigate('/store')}
              className="bg-white text-primary px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-zinc-50 transition-colors"
            >
              Ver Coleção
            </button>
          </div>
        </div>

        {/* Section: Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/booking')}
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-zinc-800 p-5 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors group"
          >
            <div className="size-12 rounded-2xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">calendar_add_on</span>
            </div>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Novo Agendamento</span>
          </button>
          <button
            onClick={() => navigate('/store')}
            className="flex flex-col items-center justify-center gap-3 bg-white dark:bg-zinc-800 p-5 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-700/50 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors group"
          >
            <div className="size-12 rounded-2xl bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-2xl">shopping_bag</span>
            </div>
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">Loja Virtual</span>
          </button>
        </section>

        {/* Section: Upcoming Appointments */}
        <section>
          <div className="flex justify-between items-center pb-3 px-1">
            <h2 className="text-zinc-900 dark:text-white text-[20px] font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">event</span>
              Sua Agenda
            </h2>
            <button onClick={() => navigate('/schedule')} className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Ver tudo</button>
          </div>

          <div className="space-y-3">
            {appointments.filter((a) => a.status === 'upcoming').slice(0, 2).map((apt) => (
              <div
                key={apt.id}
                onClick={() => navigate('/schedule')}
                className="flex gap-4 p-4 justify-between bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800/50 active:scale-[0.98] transition-transform cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-800 rounded-xl px-3 py-2 min-w-[3.5rem]">
                    <span className="text-xs font-bold text-zinc-500 uppercase">{apt.date}</span>
                    <span className="text-lg font-black text-zinc-800 dark:text-white">{(apt.time || '').split(':')[0]}</span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="text-zinc-900 dark:text-white text-base font-bold leading-normal">
                      {apt.procedure_id ? `Procedimento #${apt.procedure_id}` : 'Serviço'}
                    </p>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm font-normal leading-normal flex items-center gap-1">
                      {apt.professional_name || 'Profissional'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center text-zinc-300 dark:text-zinc-600">
                  <span className="material-symbols-outlined">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Store Highlights (New!) */}
        <section>
          <div className="flex justify-between items-center pb-3 px-1">
            <h2 className="text-zinc-900 dark:text-white text-[20px] font-bold leading-tight tracking-[-0.015em] flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">new_releases</span>
              Novidades
            </h2>
            <button onClick={() => navigate('/store')} className="text-primary text-xs font-bold uppercase tracking-wider hover:underline">Ver Loja</button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
            {products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="min-w-[160px] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800/50 cursor-pointer group"
                onClick={() => navigate('/store')}
              >
                <div
                  className="h-40 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${product.imageUrl}')` }}
                >
                  {product.isNew && (
                    <span className="m-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg inline-block shadow-sm border border-white/10">NOVO</span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-zinc-900 dark:text-white text-sm font-bold truncate">{product.name}</p>
                  <p className="text-zinc-500 dark:text-zinc-400 text-xs">{product.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-primary font-bold text-sm">R$ {Number(product.price).toFixed(2)}</p>
                    <div className="size-6 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-xs">add</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
