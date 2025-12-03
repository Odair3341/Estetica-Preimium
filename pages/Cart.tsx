import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../types';
import PrimaryButton from '../components/PrimaryButton';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

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

  const handleCheckout = () => {
    setShowSuccess(true);
    // Clear cart after delay
    setTimeout(() => {
      localStorage.removeItem('cart');
      setItems([]);
      navigate('/dashboard');
    }, 2500);
  };

  if (showSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background-light dark:bg-background-dark p-4">
        <div className="size-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-6 animate-bounce">
          <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-5xl">check_circle</span>
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Compra Realizada!</h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center">
          Seu pedido foi enviado para nossa equipe. <br/> Você receberá a confirmação em breve.
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col pb-24">
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
          <div className="flex flex-col gap-4">
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
          >
            Finalizar Compra
          </PrimaryButton>
        </footer>
      )}
    </div>
  );
};

export default Cart;