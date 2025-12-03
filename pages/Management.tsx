import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { Procedure, Client, PurchaseHistory, Product } from '../types';
import { get } from '../utils/api';

const Management: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'procedures' | 'products' | 'clients' | 'history'>('clients');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showClientHistory, setShowClientHistory] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [historyList, setHistoryList] = useState<PurchaseHistory[]>([]);
  const [clientPackages, setClientPackages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Estados para formulários
  const [newProcedure, setNewProcedure] = useState<Omit<Procedure, 'id'>>({
    name: '',
    description: '',
    price: 0,
    duration: 30,
    category: ''
  });

  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    category: '',
    imageUrl: '',
    isNew: false
  });

  const [newClient, setNewClient] = useState<Omit<Client, 'id' | 'loyaltyPoints' | 'registrationDate'>>({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    address: ''
  });

  const handleAddProcedure = () => {
    // Em uma aplicação real, isso salvaria no banco de dados
    console.log('Novo procedimento:', newProcedure);
    setShowAddModal(false);
    setNewProcedure({
      name: '',
      description: '',
      price: 0,
      duration: 30,
      category: ''
    });
  };

  const handleAddProduct = () => {
    // Em uma aplicação real, isso salvaria no banco de dados
    console.log('Novo produto:', newProduct);
    setShowAddModal(false);
    setNewProduct({
      name: '',
      price: 0,
      category: '',
      imageUrl: '',
      isNew: false
    });
  };

  const handleAddClient = () => {
    // Em uma aplicação real, isso salvaria no banco de dados
    console.log('Novo cliente:', newClient);
    setShowAddModal(false);
    setNewClient({
      name: '',
      email: '',
      phone: '',
      birthDate: '',
      address: ''
    });
  };

  const fetchClientHistory = async (clientId: number) => {
    setIsLoading(true);
    try {
      const res = await get(`/api/purchase-history/client/${clientId}`);
      const data = await res.json();
      setHistoryList(data);
    } catch (e) {
      console.error('Erro ao carregar histórico do cliente:', e);
      setHistoryList([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClientPackages = async (clientId: number) => {
    try {
      const res = await fetch(`http://localhost:3001/api/clients/${clientId}/packages`);
      const data = await res.json();
      setClientPackages(data);
    } catch (e) {
      console.error('Erro ao carregar pacotes do cliente:', e);
      setClientPackages([]);
    }
  };

  const fetchClients = async () => {
    try {
      const res = await get('/api/clients');
      const data = await res.json();
      setClients(data);
    } catch (e) {
      console.error('Erro ao carregar clientes:', e);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await get('/api/products');
      const data = await res.json();
      setProducts(data);
    } catch (e) {
      console.error('Erro ao carregar produtos:', e);
    }
  };

  const fetchProcedures = async () => {
    try {
      const res = await get('/api/procedures');
      const data = await res.json();
      setProcedures(data);
    } catch (e) {
      console.error('Erro ao carregar procedimentos:', e);
    }
  };

  React.useEffect(() => {
    fetchClients();
    fetchProducts();
    fetchProcedures();
  }, []);

  const getProductName = (productId?: string) => {
    if (!productId) return '';
    const product = products.find(p => p.id === productId);
    return product ? product.name : '';
  };

  const getServiceName = (serviceId?: string) => {
    if (!serviceId) return '';
    const procedure = procedures.find(p => p.id === serviceId);
    return procedure ? procedure.name : '';
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md pt-4 px-4 pb-2 border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Gestão</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-white hover:bg-opacity-90 transition-all"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="flex p-1 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-xl mx-4 mt-4">
        <button
          onClick={() => setActiveTab('procedures')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'procedures'
            ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400'
            }`}
        >
          Procedimentos
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'products'
            ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400'
            }`}
        >
          Produtos
        </button>
        <button
          onClick={() => setActiveTab('clients')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'clients'
            ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400'
            }`}
        >
          Clientes
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'history'
            ? 'bg-white dark:bg-zinc-800 text-primary shadow-sm'
            : 'text-zinc-500 dark:text-zinc-400'
            }`}
        >
          Histórico
        </button>
      </div>

      {/* Content */}
      <main className="flex-grow p-4 flex flex-col gap-4">
        {activeTab === 'procedures' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Procedimentos</h2>
            {procedures.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">spa</span>
                <p>Nenhum procedimento cadastrado</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {procedures.map(procedure => (
                  <div
                    key={procedure.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium text-zinc-900 dark:text-white">{procedure.name}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {procedure.category} • {procedure.duration} min
                      </p>
                    </div>
                    <div className="text-right font-bold text-primary">
                      R$ {Number(procedure.price).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Produtos</h2>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">shopping_bag</span>
                <p>Nenhum produto cadastrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="flex flex-col bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800 overflow-hidden"
                  >
                    <div
                      className="aspect-square bg-cover bg-center"
                      style={{ backgroundImage: `url("${product.imageUrl}")` }}
                    ></div>
                    <div className="p-3">
                      <p className="font-medium text-zinc-900 dark:text-white text-sm">{product.name}</p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{product.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-primary">R$ {Number(product.price).toFixed(2)}</span>
                        {product.isNew && (
                          <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full">Novo</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Clientes</h2>
            {clients.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">group</span>
                <p>Nenhum cliente cadastrado</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {clients.map(client => (
                  <div
                    key={client.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium text-zinc-900 dark:text-white">{client.name}</p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {client.email} • {client.phone}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-2 py-1 rounded-full">
                        {client.loyaltyPoints} pts
                      </span>
                      <button
                        onClick={() => {
                          setShowClientHistory(client);
                          fetchClientHistory(client.id as unknown as number);
                          fetchClientPackages(client.id as unknown as number);
                        }}
                        className="p-2 text-zinc-500 hover:text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
                      >
                        <span className="material-symbols-outlined text-lg">history</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Histórico de Compras</h2>
            {historyList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 opacity-50">
                <span className="material-symbols-outlined text-5xl mb-2">receipt_long</span>
                <p>Nenhum histórico de compras</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {historyList.map(history => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {history.type === 'product'
                          ? (products.find(p => p.id === String(history.product_id))?.name || `Produto #${history.product_id}`)
                          : (procedures.find(p => p.id === Number(history.service_id))?.name || `Serviço #${history.service_id}`)}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {history.date} • {history.type === 'product' ? 'Produto' : 'Serviço'}
                      </p>
                    </div>
                    <div className={`text-right font-bold ${history.type === 'product' ? 'text-primary' : 'text-secondary'}`}>
                      R$ {Number(history.amount).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Modal */}
      {showClientHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setShowClientHistory(null)}>
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Histórico de {showClientHistory.name}
              </h2>
              <button onClick={() => setShowClientHistory(null)} className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Total comprado: <span className="font-bold text-primary">R$ {Number(historyList.reduce((s, h) => s + Number(h.amount), 0)).toFixed(2)}</span></div>
              <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">{historyList.length} itens</div>
            </div>

            {/* Packages Section */}
            <div className="mb-6">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">inventory_2</span>
                Pacotes Ativos
              </h3>
              <div className="flex flex-col gap-2">
                {clientPackages.length === 0 ? (
                  <p className="text-sm text-zinc-500 italic">Nenhum pacote ativo</p>
                ) : (
                  clientPackages.map((pkg: any) => (
                    <div key={pkg.id} className="bg-primary/5 border border-primary/20 rounded-lg p-3 flex justify-between items-center">
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white">{pkg.service_name}</p>
                        <p className="text-xs text-zinc-500">Comprado em {new Date(pkg.purchase_date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-primary">
                          {pkg.total_sessions - pkg.used_sessions} / {pkg.total_sessions}
                        </p>
                        <p className="text-[10px] text-zinc-500 uppercase">Sessões Restantes</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <h3 className="font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-zinc-500">receipt_long</span>
              Histórico de Compras
            </h3>
            <div className="flex flex-col gap-3">
              {isLoading ? (
                <div className="text-center py-8 text-zinc-500">Carregando...</div>
              ) : historyList.length === 0 ? (
                <div className="text-center py-8 text-zinc-500">Sem compras registradas</div>
              ) : (
                historyList.map(h => (
                  <div 
                    key={h.id as any} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <span className={`material-symbols-outlined ${h.type === 'product' ? 'text-primary' : 'text-secondary'}`}>{h.type === 'product' ? 'shopping_bag' : 'spa'}</span>
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-white">
                          {h.type === 'product' 
                            ? (products.find(p => p.id === String(h.product_id))?.name || `Produto #${h.product_id}`)
                            : (procedures.find(p => p.id === Number(h.service_id))?.name || `Serviço #${h.service_id}`)}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{h.date}</p>
                      </div>
                    </div>
                    <div className={`font-bold ${h.type === 'product' ? 'text-primary' : 'text-secondary'}`}>R$ {Number(h.amount).toFixed(2)}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                {activeTab === 'procedures' && 'Novo Procedimento'}
                {activeTab === 'products' && 'Novo Produto'}
                {activeTab === 'clients' && 'Novo Cliente'}
                {activeTab === 'history' && 'Novo Registro'}
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {activeTab === 'procedures' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Nome do Procedimento
                    </label>
                    <input
                      type="text"
                      value={newProcedure.name}
                      onChange={(e) => setNewProcedure({ ...newProcedure, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="Ex: Limpeza de Pele"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={newProcedure.description}
                      onChange={(e) => setNewProcedure({ ...newProcedure, description: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="Descrição detalhada do procedimento"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Preço (R$)
                      </label>
                      <input
                        type="number"
                        value={newProcedure.price || ''}
                        onChange={(e) => setNewProcedure({ ...newProcedure, price: parseFloat(e.target.value) || 0 })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="0,00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Duração (min)
                      </label>
                      <input
                        type="number"
                        value={newProcedure.duration || ''}
                        onChange={(e) => setNewProcedure({ ...newProcedure, duration: parseInt(e.target.value) || 30 })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Categoria
                    </label>
                    <select
                      value={newProcedure.category}
                      onChange={(e) => setNewProcedure({ ...newProcedure, category: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    >
                      <option value="">Selecione</option>
                      <option value="Rosto">Rosto</option>
                      <option value="Corporal">Corporal</option>
                      <option value="Mãos e Pés">Mãos e Pés</option>
                      <option value="Cabelo">Cabelo</option>
                    </select>
                  </div>

                  <button
                    onClick={handleAddProcedure}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Adicionar Procedimento
                  </button>
                </>
              )}

              {activeTab === 'products' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Nome do Produto
                    </label>
                    <input
                      type="text"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="Ex: Vestido Floral"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Preço (R$)
                      </label>
                      <input
                        type="number"
                        value={newProduct.price || ''}
                        onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="0,00"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Categoria
                      </label>
                      <select
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      >
                        <option value="">Selecione</option>
                        <option value="Vestidos">Vestidos</option>
                        <option value="Blusas">Blusas</option>
                        <option value="Calças">Calças</option>
                        <option value="Conjuntos">Conjuntos</option>
                        <option value="Cosméticos">Cosméticos</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      URL da Imagem
                    </label>
                    <input
                      type="text"
                      value={newProduct.imageUrl}
                      onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isNew"
                      checked={newProduct.isNew}
                      onChange={(e) => setNewProduct({ ...newProduct, isNew: e.target.checked })}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
                    />
                    <label htmlFor="isNew" className="ml-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Marcar como novo produto
                    </label>
                  </div>

                  <button
                    onClick={handleAddProduct}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Adicionar Produto
                  </button>
                </>
              )}

              {activeTab === 'clients' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={newClient.name}
                      onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="Ex: Maria Silva"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newClient.email}
                        onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="exemplo@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={newClient.phone}
                        onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        value={newClient.birthDate}
                        onChange={(e) => setNewClient({ ...newClient, birthDate: e.target.value })}
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                        Pontos de Fidelidade
                      </label>
                      <input
                        type="number"
                        defaultValue="0"
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="0"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={newClient.address}
                      onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                      className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                      placeholder="Rua, número, bairro, cidade"
                    />
                  </div>

                  <button
                    onClick={handleAddClient}
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all"
                  >
                    Adicionar Cliente
                  </button>
                </>
              )}

              {activeTab === 'history' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Cliente
                    </label>
                    <select className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white">
                      <option value="">Todos os clientes</option>
                      {clients.map(client => (
                        <option key={client.id} value={client.id}>{client.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Período
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="date"
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="Data inicial"
                      />
                      <input
                        type="date"
                        className="w-full p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        placeholder="Data final"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
                    {historyList.map(history => (
                      <div
                        key={history.id}
                        className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                      >
                        <div className="flex flex-col">
                          <p className="font-medium text-zinc-900 dark:text-white">
                            {history.type === 'product'
                              ? (products.find(p => p.id === String(history.product_id))?.name || `Produto #${history.product_id}`)
                              : (procedures.find(p => p.id === Number(history.service_id))?.name || `Serviço #${history.service_id}`)}
                          </p>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {clients.find(c => c.id === (history.client_id as any))?.name} • {history.date}
                          </p>
                        </div>
                        <div className={`text-right font-bold ${history.type === 'product' ? 'text-primary' : 'text-secondary'}`}>
                          R$ {Number(history.amount).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-opacity-90 transition-all mt-4"
                  >
                    Exportar Relatório
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Client History Modal */}
      {showClientHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
                Histórico de {showClientHistory.name}
              </h2>
              <button
                onClick={() => setShowClientHistory(null)}
                className="text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto">
              {historyList.length === 0 ? (
                <div className="py-8 text-center text-zinc-500 dark:text-zinc-400">
                  <span className="material-symbols-outlined text-4xl mb-2">receipt_long</span>
                  <p>Nenhum histórico de compras</p>
                </div>
              ) : (
                historyList.map(history => (
                  <div
                    key={history.id}
                    className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl"
                  >
                    <div className="flex flex-col">
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {history.type === 'product'
                          ? (products.find(p => p.id === String(history.product_id))?.name || `Produto #${history.product_id}`)
                          : (procedures.find(p => p.id === Number(history.service_id))?.name || `Serviço #${history.service_id}`)}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {history.date} • {history.type === 'product' ? 'Produto' : 'Serviço'}
                      </p>
                    </div>
                    <div className={`text-right font-bold ${history.type === 'product' ? 'text-primary' : 'text-secondary'}`}>
                      R$ {Number(history.amount).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Management;
