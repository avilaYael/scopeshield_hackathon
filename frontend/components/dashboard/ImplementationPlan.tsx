import SectionHeader from '@/components/ui/SectionHeader';
import { ImplementationStep } from '@/types/scopeContract';

interface ImplementationPlanProps {
  steps: ImplementationStep[];
}

export default function ImplementationPlan({ steps }: ImplementationPlanProps) {
  return (
    <>
      <SectionHeader
        title="Implementation Plan"
        description="Step-by-step roadmap"
        accentColor="indigo"
      />
      
      <div className="space-y-2 pl-4">
        {steps.map((step, index) => (
          <div key={step.step} className="relative">
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div className="absolute left-3.5 top-8 bottom-0 w-px bg-zinc-800" />
            )}
            
            <div className="flex gap-3">
              {/* Step number */}
              <div className="flex-shrink-0 w-7 h-7 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 font-mono font-bold text-xs flex items-center justify-center relative z-10">
                {step.step}
              </div>
              
              {/* Step content */}
              <div className="flex-1 pb-3">
                <div className="border-l-2 border-zinc-800 pl-3 py-0.5">
                  <h3 className="font-semibold text-zinc-100 text-sm mb-1.5">
                    {step.task}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs">
                    <div className="flex items-center gap-1.5 text-zinc-400 font-mono">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{step.duration}</span>
                    </div>
                    
                    {step.dependencies.length > 0 && (
                      <div className="flex items-center gap-1.5 text-zinc-500 font-mono">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>→ {step.dependencies.join(', ')}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
