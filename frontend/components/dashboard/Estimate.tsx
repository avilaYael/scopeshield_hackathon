import Card from '@/components/ui/Card';
import { Estimate as EstimateType } from '@/types/scopeContract';

interface EstimateProps {
  estimate: EstimateType;
}

export default function Estimate({ estimate }: EstimateProps) {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Estimate
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Time and complexity
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Complexity</div>
          <div className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            {estimate.complexity}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">Time Range</div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {estimate.timeRange}
          </div>
        </div>

        {estimate.breakdown && (
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
              Breakdown
            </div>
            <div className="space-y-2">
              {Object.entries(estimate.breakdown).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 dark:text-slate-400 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-50">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// Made with Bob
