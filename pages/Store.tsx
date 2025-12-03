import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { PRODUCTS } from '../constants';
import { Product, CartItem, Procedure } from '../types';
import ProductCard from '../components/ProductCard';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [filter, setFilter] = useState('Todos');
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [procedures, setProcedures] = useState<Procedure[]>([]);
  const [isLoadingProcedures, setIsLoadingProcedures] = useState(false);

  const productCategories = ['Todos', 'Vestidos', 'Blusas', 'Calças', 'Conjuntos', 'Cosméticos'];
  const serviceCategories = ['Todos', 'Facial', 'Corporal', 'Injetáveis', 'Unhas'];

  useEffect(() => {
    // Load cart count from local storage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);
      const count = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    }

    // Fetch procedures from API
    fetchProcedures();
  }, []);

  const fetchProcedures = async () => {
    setIsLoadingProcedures(true);
    try {
      const response = await fetch('http://localhost:3001/api/procedures');
      if (response.ok) {
        const data = await response.json();
        // Mapear categorias baseadas no nome ou descrição se não vier do banco
        const mappedProcedures = data.map((p: any) => ({
            ...p,
            category: p.category || determineCategory(p.name)
        }));
        setProcedures(mappedProcedures);
      }
    } catch (error) {
      console.error('Erro ao buscar procedimentos:', error);
    } finally {
      setIsLoadingProcedures(false);
    }
  };

  const determineCategory = (name: string): string => {
    const lower = name.toLowerCase();
    if (lower.includes('pele') || lower.includes('facial') || lower.includes('peeling')) return 'Facial';
    if (lower.includes('massagem') || lower.includes('drenagem')) return 'Corporal';
    if (lower.includes('botox') || lower.includes('preenchimento')) return 'Injetáveis';
    if (lower.includes('manicure') || lower.includes('pedicure') || lower.includes('unha')) return 'Unhas';
    return 'Outros';
  };

  const filteredProducts = filter === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const filteredProcedures = filter === 'Todos'
    ? procedures
    : procedures.filter(p => p.category === filter);

  const addToCart = (item: Product | Procedure, type: 'product' | 'service') => {
    
    // Get current cart
    const savedCart = localStorage.getItem('cart');
    let items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if item exists (considering type)
    const existingItemIndex = items.findIndex(i => i.id === item.id && i.type === type);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += 1;
    } else {
      // Adaptar Procedure para CartItem se necessário
      const newItem: CartItem = {
        id: item.id.toString(), // Garantir string
        name: item.name,
        price: Number(item.price),
        category: item.category || 'Serviço',
        imageUrl: (item as Product).imageUrl || 'https://ui-avatars.com/api/?name=' + item.name + '&background=BC9EC1&color=fff',
        quantity: 1,
        type: type
      };
      items.push(newItem);
    }
    
    // Save
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update count UI
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
    
    // Show toast notification
    setToastMessage(`${item.name} adicionado ao carrinho!`);
    setShowToast(true);
    
    // Hide toast after delay
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-10 flex flex-col bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between px-4 py-3">
            <div className="flex size-10 shrink-0 items-center justify-start">
            <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
            </div>
            <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-neutral-900 dark:text-white">
            Loja & Serviços
            </h1>
            <div className="flex size-10 shrink-0 items-center justify-end relative">
            <button 
                onClick={() => navigate('/cart')}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent text-neutral-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/5"
            >
                <span className="material-symbols-outlined">shopping_cart</span>
            </button>
            {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-bounce shadow-sm">
                {cartCount}
                </span>
            )}
            </div>
        </div>

        {/* Tabs Switcher */}
        <div className="flex px-4 pb-3 gap-4">
            <button 
                onClick={() => { setActiveTab('products'); setFilter('Todos'); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'products' ? 'bg-primary text-white shadow-md' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
            >
                Produtos
            </button>
            <button 
                onClick={() => { setActiveTab('services'); setFilter('Todos'); }}
                className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'services' ? 'bg-primary text-white shadow-md' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'}`}
            >
                Procedimentos
            </button>
        </div>
      </header>

      {/* Categories */}
      <div className="flex w-full gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
        {(activeTab === 'products' ? productCategories : serviceCategories).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`flex h-9 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full px-5 transition-all ${
              filter === cat 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700'
            }`}
          >
            <p className="text-sm font-medium leading-normal whitespace-nowrap">{cat}</p>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <main className="flex-grow p-4">
        {activeTab === 'products' ? (
            <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={(p) => addToCart(p, 'product')} 
                />
                ))}
            </div>
        ) : (
            <div className="flex flex-col gap-3">
                {isLoadingProcedures ? (
                    <div className="text-center py-10 text-zinc-500">Carregando procedimentos...</div>
                ) : filteredProcedures.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500">Nenhum procedimento encontrado.</div>
                ) : (
                    filteredProcedures.map((proc) => (
                        <div key={proc.id} className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-800 flex justify-between items-center">
                            <div className="flex-1">
                                <h3 className="font-bold text-zinc-900 dark:text-white">{proc.name}</h3>
                                <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{proc.description}</p>
                                <div className="flex items-center gap-3 mt-2">
                                    <span className="text-primary font-bold">R$ {Number(proc.price).toFixed(2)}</span>
                                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                                        {proc.duration} min
                                    </span>
                                </div>
                            </div>
                            <button 
                                onClick={() => addToCart(proc, 'service')}
                                className="ml-4 size-10 bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full flex items-center justify-center transition-colors"
                            >
                                <span className="material-symbols-outlined">add</span>
                            </button>
                        </div>
                    ))
                )}
            </div>
        )}
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-6 py-3 rounded-full shadow-xl z-50 animate-fadeIn flex items-center gap-3">
          <span className="material-symbols-outlined text-green-500">check_circle</span>
          <span className="font-bold text-sm">{toastMessage}</span>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Store;