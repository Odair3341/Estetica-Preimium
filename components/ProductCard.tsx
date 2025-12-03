import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div 
      key={product.id} 
      className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-zinc-100 dark:border-zinc-800/50 flex flex-col group"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url("${product.imageUrl}")` }}
        ></div>
        {product.isNew && (
          <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
            LANÇAMENTO
          </div>
        )}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-2 right-2 h-9 w-9 bg-white dark:bg-zinc-800 rounded-full flex items-center justify-center shadow-md text-primary hover:scale-110 hover:bg-primary hover:text-white transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
        </button>
      </div>
      
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex-grow">
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-0.5 uppercase tracking-wide">{product.category}</p>
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight mb-1 line-clamp-2">{product.name}</h3>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-base font-bold text-primary">R$ {Number(product.price).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
