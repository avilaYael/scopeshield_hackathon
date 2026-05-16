import { ReactNode } from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  accentColor: 'emerald' | 'amber' | 'rose' | 'blue' | 'purple' | 'indigo';
  action?: ReactNode;
}

/**
 * Standardized section header with consistent typography and accent colors
 */
export default function SectionHeader({ title, description, accentColor, action }: SectionHeaderProps) {
  const accentColors = {
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    indigo: 'bg-indigo-500',
  };

  return (
    <div className="flex items-start justify-between gap-4 mb-4">
      <div className="flex items-start gap-3 flex-1">
        <div className={`flex-shrink-0 w-1 h-6 ${accentColors[accentColor]} rounded-full`}></div>
        <div className="flex-1">
          <h2 className="text-base font-semibold text-zinc-50 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-zinc-500 font-mono mt-0.5">
            {description}
          </p>
        </div>
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}

// Made with Bob