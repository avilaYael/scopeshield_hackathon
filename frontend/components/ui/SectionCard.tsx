import { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Standardized section card with consistent styling tokens
 * Used across all dashboard components for visual unity
 */
export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <div className={`border border-zinc-800 rounded-lg p-5 bg-zinc-900/30 ${className}`}>
      {children}
    </div>
  );
}

// Made with Bob