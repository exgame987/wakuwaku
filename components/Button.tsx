
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center';
  
  let variantStyles = '';
  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-400 border border-gray-300';
      break;
    case 'danger':
      variantStyles = 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500';
      break;
    case 'success':
      variantStyles = 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400';
      break;
    case 'ghost':
      variantStyles = 'bg-transparent hover:bg-indigo-50 text-indigo-600 focus:ring-indigo-500 shadow-none';
      break;
  }

  let sizeStyles = '';
  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-5 py-2.5 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-8 py-3 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
      {...props}
    >
      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
