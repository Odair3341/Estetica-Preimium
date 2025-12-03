import React from 'react';

interface ChartBarProps {
  label: string;
  value: number;
  maxValue: number;
  color: string;
}

const ChartBar: React.FC<ChartBarProps> = ({ label, value, maxValue, color }) => {
  const barHeight = maxValue > 0 ? (value / maxValue) * 100 : 0;
  
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="flex flex-col items-center w-full mb-2">
        <div 
          className="w-full rounded-t transition-all duration-500 ease-out"
          style={{ 
            height: `${barHeight}%`,
            backgroundColor: color,
            minHeight: '4px'
          }}
        ></div>
      </div>
      <span className="text-xs text-zinc-500 dark:text-zinc-400">{label}</span>
      <span className="text-xs font-medium text-zinc-900 dark:text-white mt-1">
        R$ {value.toFixed(2)}
      </span>
    </div>
  );
};

export default ChartBar;