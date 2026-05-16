import RiskScoreGauge from '@/components/ui/RiskScoreGauge';

interface DashboardHeaderProps {
  riskScore: number;
  onNewAnalysis: () => void;
}

export default function DashboardHeader({ riskScore, onNewAnalysis }: DashboardHeaderProps) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-2">
            Scope Contract
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Technical analysis and risk assessment for your project request
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <RiskScoreGauge score={riskScore} size="lg" />
          
          <button
            onClick={onNewAnalysis}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
