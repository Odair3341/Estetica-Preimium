import React from 'react';

interface FinanceCardProps {
  title: string;
  value: string;
  color: 'green' | 'red' | 'blue' | 'orange';
  icon: string;
}

const FinanceCard: React.FC<FinanceCardProps> = ({ title, value, color, icon }) => {
  const colorClasses = {
    green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200'
  };

  const valueColorClasses = {
    green: 'text-green-900 dark:text-green-100',
    red: 'text-red-900 dark:text-red-100',
    blue: 'text-blue-900 dark:text-blue-100',
    orange: 'text-orange-900 dark:text-orange-100'
  };

  return (
    <div className={`${colorClasses[color]} rounded-2xl p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className={`text-xl font-bold ${valueColorClasses[color]}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-full ${colorClasses[color].replace('100', '200').replace('900/30', '800/30')}`}>
          <span className="material-symbols-outlined">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceCard;