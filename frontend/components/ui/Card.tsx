import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'warning';
}

export default function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variantClasses = {
    default: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700',
    highlighted: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800',
  };

  return (
    <div className={`rounded-xl border shadow-sm p-6 ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}

// Made with Bob
