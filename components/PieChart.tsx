import React from 'react';

interface PieChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
}

const PieChart: React.FC<PieChartProps> = ({ data, size = 120 }) => {
  // Calcular o total
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Se o total for zero, retornar um gráfico vazio
  if (total === 0) {
    return (
      <div 
        className="rounded-full bg-zinc-200 dark:bg-zinc-700"
        style={{ width: size, height: size }}
      ></div>
    );
  }
  
  // Calcular ângulos para cada segmento
  let startAngle = 0;
  const segments = data.map(item => {
    const percentage = (item.value / total) * 100;
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    
    const segment = {
      ...item,
      startAngle,
      endAngle,
      percentage
    };
    
    startAngle = endAngle;
    return segment;
  });
  
  // Criar paths para cada segmento
  const paths = segments.map((segment, index) => {
    const x1 = 50 + 50 * Math.cos((segment.startAngle - 90) * Math.PI / 180);
    const y1 = 50 + 50 * Math.sin((segment.startAngle - 90) * Math.PI / 180);
    const x2 = 50 + 50 * Math.cos((segment.endAngle - 90) * Math.PI / 180);
    const y2 = 50 + 50 * Math.sin((segment.endAngle - 90) * Math.PI / 180);
    
    const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
    
    const pathData = `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    
    return (
      <path
        key={index}
        d={pathData}
        fill={segment.color}
      />
    );
  });
  
  return (
    <div className="relative">
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100"
        className="transform -rotate-90"
      >
        {paths}
      </svg>
      
      {/* Legenda */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-zinc-900 dark:text-white">R$ {total.toFixed(2)}</span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">Total</span>
      </div>
    </div>
  );
};

export default PieChart;