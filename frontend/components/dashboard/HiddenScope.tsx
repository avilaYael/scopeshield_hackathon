import Card from '@/components/ui/Card';

interface HiddenScopeProps {
  items: string[];
}

export default function HiddenScope({ items }: HiddenScopeProps) {
  return (
    <Card variant="warning">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <svg className="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Hidden Scope
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Work that&apos;s implied but not explicitly mentioned
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <svg className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-slate-700 dark:text-slate-300">{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

// Made with Bob
