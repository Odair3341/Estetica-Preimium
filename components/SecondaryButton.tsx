import React from 'react';

interface SecondaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({ 
  children, 
  onClick, 
  disabled = false, 
  className = '', 
  type = 'button',
  icon 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 w-full h-14 rounded-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-primary dark:text-primary font-bold text-base leading-normal shadow-sm hover:shadow-md hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-all duration-200 ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default SecondaryButton;