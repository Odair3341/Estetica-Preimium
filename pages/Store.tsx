import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { PRODUCTS } from '../constants';
import { Product, CartItem } from '../types';
import SecondaryButton from '../components/SecondaryButton';
import ProductCard from '../components/ProductCard';

const Store: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Todos');
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const categories = ['Todos', 'Vestidos', 'Blusas', 'Calças', 'Conjuntos', 'Cosméticos'];

  useEffect(() => {
    // Load cart count from local storage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items: CartItem[] = JSON.parse(savedCart);
      const count = items.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    }
  }, []);

  const filteredProducts = filter === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const addToCart = (product: Product) => {
    
    // Get current cart
    const savedCart = localStorage.getItem('cart');
    let items: CartItem[] = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if item exists
    const existingItemIndex = items.findIndex(i => i.id === product.id);
    
    if (existingItemIndex >= 0) {
      items[existingItemIndex].quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }
    
    // Save
    localStorage.setItem('cart', JSON.stringify(items));
    
    // Update count UI
    const count = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
    
    // Show toast notification
    setToastMessage(`${product.name} adicionado ao carrinho!`);
    setShowToast(true);
    
    // Hide toast after delay
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24">
      <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 px-4 py-3 backdrop-blur-md dark:bg-background-dark/95 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex size-10 shrink-0 items-center justify-start">
           <span className="material-symbols-outlined text-primary text-3xl">storefront</span>
        </div>
        <h1 className="flex-1 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-neutral-900 dark:text-white">
          Boutique & Produtos
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
      </header>

      {/* Categories */}
      <div className="flex w-full gap-2 overflow-x-auto px-4 py-4 scrollbar-hide">
        {categories.map(cat => (
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

      {/* Product Grid */}
      <main className="flex-grow p-4 grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={addToCart} 
          />
        ))}
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-3 rounded-full shadow-lg z-50 animate-fadeIn">
          <div className="flex items-center">
            <span className="material-symbols-outlined mr-2">check_circle</span>
            <span className="font-medium text-sm">{toastMessage}</span>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default Store;