import Card from '@/components/ui/Card';

interface HiddenScopeProps {
  items: string[];
}

export default function HiddenScope({ items }: HiddenScopeProps) {
  return (
    <Card variant="warning">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div className="flex items-start gap-3 flex-1">
          <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
              Hidden Scope Detected
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Work implied but not explicitly mentioned by the client
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 rounded-full">
          <span className="text-2xl font-bold text-amber-700 dark:text-amber-300">{items.length}</span>
          <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase">Tasks</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg border border-amber-200 dark:border-amber-800/30 hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-colors"
          >
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-800/50 flex items-center justify-center">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300">{index + 1}</span>
            </div>
            <span className="text-slate-700 dark:text-slate-300 leading-relaxed flex-1">{item}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Made with Bob
