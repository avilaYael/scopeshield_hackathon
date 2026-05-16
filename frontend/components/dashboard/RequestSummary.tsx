import Card from '@/components/ui/Card';

interface RequestSummaryProps {
  summary: string;
}

export default function RequestSummary({ summary }: RequestSummaryProps) {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Request Summary
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            What the client is actually asking for
          </p>
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {summary}
        </p>
      </div>
    </Card>
  );
}

// Made with Bob
