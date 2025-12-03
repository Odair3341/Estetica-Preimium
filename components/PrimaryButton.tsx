import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
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
      className={`flex items-center justify-center w-full h-14 rounded-full bg-primary disabled:bg-primary/70 text-white text-base font-bold leading-normal shadow-lg shadow-primary/30 hover:shadow-primary/40 hover:bg-opacity-90 transition-all duration-200 ${className}`}
    >
      {icon && (
        <span className="material-symbols-outlined mr-2">{icon}</span>
      )}
      {children}
    </button>
  );
};

export default PrimaryButton;