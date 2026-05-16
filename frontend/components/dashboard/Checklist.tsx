import Card from '@/components/ui/Card';

interface ChecklistProps {
  items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Implementation Checklist
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Complete task list for execution
          </p>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-3">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {item.replace(/^✓\s*/, '')}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Made with Bob
