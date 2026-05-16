import SectionHeader from '@/components/ui/SectionHeader';
import { Estimate as EstimateType } from '@/types/scopeContract';

interface EstimateProps {
  estimate: EstimateType;
}

export default function Estimate({ estimate }: EstimateProps) {
  return (
    <>
      <SectionHeader
        title="Estimate"
        description="Time and complexity"
        accentColor="emerald"
      />
      
      <div className="grid grid-cols-2 gap-4 pl-4">
        <div>
          <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">Complexity</div>
          <div className="text-sm font-semibold text-zinc-100">
            {estimate.complexity}
          </div>
        </div>
        
        <div>
          <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">Time Range</div>
          <div className="text-xl font-bold text-emerald-400 font-mono tracking-tight">
            {estimate.timeRange}
          </div>
        </div>

        {estimate.breakdown && Object.entries(estimate.breakdown).map(([key, value]) => (
          <div key={key}>
            <div className="text-xs text-zinc-500 mb-1 font-mono uppercase tracking-wider">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </div>
            <div className="text-sm font-medium text-zinc-200 font-mono">
              {value}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
