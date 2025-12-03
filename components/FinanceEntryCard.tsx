import React from 'react';
import { FinancialEntry } from '../types';

interface FinanceEntryCardProps {
  entry: FinancialEntry;
  onEdit?: (entry: FinancialEntry) => void;
  onDelete?: (id: string) => void;
}

const FinanceEntryCard: React.FC<FinanceEntryCardProps> = ({ entry, onEdit, onDelete }) => {
  return (
    <div 
      className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
    >
      <div className="flex flex-col flex-grow">
        <p className="font-medium text-zinc-900 dark:text-white">{entry.description}</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {entry.date} • {entry.category} • {entry.source === 'esthetic' ? 'Estética' : 'Loja'}
        </p>
      </div>
      <div className={`text-right font-bold mr-3 ${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
        {entry.type === 'income' ? '+' : '-'} R$ {Number(entry.amount).toFixed(2)}
      </div>
      <div className="flex gap-2">
        <button 
          onClick={() => onEdit && onEdit(entry)}
          className="p-2 text-zinc-500 hover:text-primary hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        >
          <span className="material-symbols-outlined text-lg">edit</span>
        </button>
        <button 
          onClick={() => onDelete && onDelete(entry.id)}
          className="p-2 text-zinc-500 hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
    </div>
  );
};

export default FinanceEntryCard;
