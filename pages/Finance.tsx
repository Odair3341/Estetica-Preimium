import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { FINANCIAL_ENTRIES, CASH_REGISTERS } from '../constants';
import { FinancialEntry } from '../types';
import FinanceCard from '../components/FinanceCard';
import FinanceEntryCard from '../components/FinanceEntryCard';
import ChartBar from '../components/ChartBar';
import PieChart from '../components/PieChart';

const Finance: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'daily' | 'entries' | 'reports'>('daily');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FinancialEntry | null>(null);
  const [newEntry, setNewEntry] = useState<Omit<FinancialEntry, 'id'>>({
    type: 'income',
    category: '',
    description: '',
    amount: 0,
    date: new Date().toISOString().split('T')[0],
    source: 'esthetic'
  });

  // Load financial entries from localStorage or use defaults
  const [financialEntries, setFinancialEntries] = useState<FinancialEntry[]>(() => {
    const savedEntries = localStorage.getItem('financialEntries');
    return savedEntries ? JSON.parse(savedEntries) : FINANCIAL_ENTRIES;
  });

  const today = new Date().toISOString().split('T')[0];
  const todayEntries = financialEntries.filter(entry => entry.date === today);
  const totalIncome = todayEntries
    .filter(entry => entry.type === 'income')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const totalExpenses = todayEntries
    .filter(entry => entry.type === 'expense')
    .reduce((sum, entry) => sum + entry.amount, 0);
  const balance = totalIncome - totalExpenses;

  const handleAddEntry = () => {
    // Create new entry with unique ID
    const entryToAdd: FinancialEntry = {
      ...newEntry,
      id: `entry_${Date.now()}`
    };
    
    // Update state
    const updatedEntries = [...financialEntries, entryToAdd];
    setFinancialEntries(updatedEntries);
    
    // Save to localStorage
    localStorage.setItem('financialEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setShowAddModal(false);
    setNewEntry({
      type: 'income',
      category: '',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      source: 'esthetic'
    });
  };

  const handleEditEntry = (entry: FinancialEntry) => {
    setEditingEntry(entry);
    setNewEntry({
      type: entry.type,
      category: entry.category,
      description: entry.description,
      amount: entry.amount,
      date: entry.date,
      source: entry.source
    });
    setShowEditModal(true);
  };

  const handleUpdateEntry = () => {
    if (!editingEntry) return;
    
    // Update entry
    const updatedEntries = financialEntries.map(entry => 
      entry.id === editingEntry.id ? {...editingEntry, ...newEntry} : entry
    );
    
    setFinancialEntries(updatedEntries);
    localStorage.setItem('financialEntries', JSON.stringify(updatedEntries));
    
    // Reset form
    setShowEditModal(false);
    setEditingEntry(null);
    setNewEntry({
      type: 'income',
      category: '',
      description: '',
      amount: 0,
      date: new Date().toISOString().split('T')[0],
      source: 'esthetic'
    });
  };

  const handleDeleteEntry = (id: string) => {
    const updatedEntries = financialEntries.filter(entry => entry.id !== id);
    setFinancialEntries(updatedEntries);
    localStorage.setItem('financialEntries', JSON.stringify(updatedEntries));
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-4 px-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Finanças</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3 p-4">
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

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl mx-4">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'daily' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' 
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          Diário
        </button>
        <button
          onClick={() => setActiveTab('entries')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'entries' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' 
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          Lançamentos
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${
            activeTab === 'reports' 
              ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm' 
              : 'text-zinc-500 dark:text-zinc-400'
          }`}
        >
          Relatórios
        </button>
      </div>

      {/* Content */}
      <main className="flex-grow p-4 flex flex-col gap-4">
        {activeTab === 'daily' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Caixa de Hoje</h2>
            {todayEntries.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">payments</span>
                <p>Nenhum lançamento hoje</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todayEntries.map(entry => (
                  <FinanceEntryCard 
                    key={entry.id} 
                    entry={entry} 
                    onEdit={handleEditEntry}
                    onDelete={handleDeleteEntry}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'entries' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Todos os Lançamentos</h2>
            <div className="flex flex-col gap-3">
              {financialEntries.map(entry => (
                <FinanceEntryCard 
                  key={entry.id} 
                  entry={entry} 
                  onEdit={handleEditEntry}
                  onDelete={handleDeleteEntry}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Relatórios</h2>
            
            {/* Resumo Financeiro */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Este Mês</h3>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Receitas:</span>
                    <span className="font-medium">R$ {totalIncome.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500 dark:text-zinc-400">Despesas:</span>
                    <span className="font-medium">R$ {totalExpenses.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-700">
                    <span className="text-zinc-500 dark:text-zinc-400">Saldo:</span>
                    <span className="font-bold text-blue-600">R$ {balance.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
                <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Por Origem</h3>
                <PieChart 
                  data={[
                    { label: 'Estética', value: financialEntries.filter(e => e.source === 'esthetic' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0), color: '#4f46e5' },
                    { label: 'Loja', value: financialEntries.filter(e => e.source === 'store' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0), color: '#f97316' }
                  ]}
                  size={100}
                />
              </div>
            </div>
            
            {/* Receitas por Categoria */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">Receitas por Categoria</h3>
              <div className="flex items-end h-32 gap-2">
                <ChartBar 
                  label="Serviços" 
                  value={financialEntries.filter(e => e.category === 'Serviços' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.category === 'Serviços' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Produtos' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Material' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)
                  )}
                  color="#10b981"
                />
                <ChartBar 
                  label="Produtos" 
                  value={financialEntries.filter(e => e.category === 'Produtos' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.category === 'Serviços' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Produtos' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Material' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)
                  )}
                  color="#3b82f6"
                />
                <ChartBar 
                  label="Outros" 
                  value={financialEntries.filter(e => e.category === 'Outros' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.category === 'Serviços' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Produtos' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0),
                    financialEntries.filter(e => e.category === 'Material' && e.type === 'income').reduce((sum, e) => sum + e.amount, 0)
                  )}
                  color="#8b5cf6"
                />
              </div>
            </div>
            
            {/* Comparativo Mensal */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl p-4 border border-zinc-100 dark:border-zinc-800">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3">Comparativo Mensal</h3>
              <div className="flex items-end h-32 gap-2">
                <ChartBar 
                  label="Jun" 
                  value={financialEntries.filter(e => e.date.startsWith('2024-06')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.date.startsWith('2024-06')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-07')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-08')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)
                  )}
                  color="#10b981"
                />
                <ChartBar 
                  label="Jul" 
                  value={financialEntries.filter(e => e.date.startsWith('2024-07')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.date.startsWith('2024-06')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-07')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-08')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)
                  )}
                  color="#3b82f6"
                />
                <ChartBar 
                  label="Ago" 
                  value={financialEntries.filter(e => e.date.startsWith('2024-08')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)} 
                  maxValue={Math.max(
                    financialEntries.filter(e => e.date.startsWith('2024-06')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-07')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0),
                    financialEntries.filter(e => e.date.startsWith('2024-08')).reduce((sum, e) => sum + (e.type === 'income' ? e.amount : -e.amount), 0)
                  )}
                  color="#8b5cf6"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Entry Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {showEditModal ? 'Editar Lançamento' : 'Novo Lançamento'}
              </h2>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setShowEditModal(false);
                  setEditingEntry(null);
                }}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setNewEntry({...newEntry, type: 'income'})}
                  className={`flex-1 py-3 rounded-xl font-medium ${newEntry.type === 'income' ? 'bg-green-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                >
                  Receita
                </button>
                <button
                  onClick={() => setNewEntry({...newEntry, type: 'expense'})}
                  className={`flex-1 py-3 rounded-xl font-medium ${newEntry.type === 'expense' ? 'bg-red-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'}`}
                >
                  Despesa
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Valor
                </label>
                <input
                  type="number"
                  value={newEntry.amount || ''}
                  onChange={(e) => setNewEntry({...newEntry, amount: parseFloat(e.target.value) || 0})}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  placeholder="0,00"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  value={newEntry.description}
                  onChange={(e) => setNewEntry({...newEntry, description: e.target.value})}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  placeholder="Descrição do lançamento"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Categoria
                  </label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({...newEntry, category: e.target.value})}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  >
                    <option value="">Selecione</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Produtos">Produtos</option>
                    <option value="Material">Material</option>
                    <option value="Salário">Salário</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                    Origem
                  </label>
                  <select
                    value={newEntry.source}
                    onChange={(e) => setNewEntry({...newEntry, source: e.target.value as 'esthetic' | 'store'})}
                    className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                  >
                    <option value="esthetic">Estética</option>
                    <option value="store">Loja</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                  Data
                </label>
                <input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                  className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                />
              </div>
              
              <button
                onClick={showEditModal ? handleUpdateEntry : handleAddEntry}
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
              >
                {showEditModal ? 'Atualizar Lançamento' : 'Adicionar Lançamento'}
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Finance;