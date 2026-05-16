import Card from '@/components/ui/Card';
import { ImplementationStep } from '@/types/scopeContract';

interface ImplementationPlanProps {
  steps: ImplementationStep[];
}

export default function ImplementationPlan({ steps }: ImplementationPlanProps) {
  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Implementation Plan
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Step-by-step execution roadmap
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={step.step} className="relative">
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
            )}
            
            <div className="flex gap-4">
              {/* Step number */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold flex items-center justify-center relative z-10">
                {step.step}
              </div>
              
              {/* Step content */}
              <div className="flex-1 pb-4">
                <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-50 mb-2">
                    {step.task}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{step.duration}</span>
                    </div>
                    
                    {step.dependencies.length > 0 && (
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Depends on: {step.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Made with Bob
