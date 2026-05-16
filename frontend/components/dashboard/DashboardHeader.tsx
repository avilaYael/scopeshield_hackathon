import RiskScoreGauge from '@/components/ui/RiskScoreGauge';

interface DashboardHeaderProps {
  riskScore: number;
  onNewAnalysis: () => void;
}

export default function DashboardHeader({ riskScore, onNewAnalysis }: DashboardHeaderProps) {
  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low Risk', color: 'text-green-600 dark:text-green-400' };
    if (score <= 6) return { label: 'Medium Risk', color: 'text-amber-600 dark:text-amber-400' };
    return { label: 'High Risk', color: 'text-red-600 dark:text-red-400' };
  };

  const risk = getRiskLevel(riskScore);

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-xl p-8 mb-8 border-2 border-slate-200 dark:border-slate-700">
      {/* Top Section - Title and Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-1">
            Scope Contract
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Technical analysis and risk assessment
          </p>
        </div>
        
        <button
          onClick={onNewAnalysis}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Analysis
        </button>
      </div>

      {/* Risk Score - Prominent Center Section */}
      <div className="flex flex-col items-center justify-center py-6 px-4 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700">
        <div className="text-center mb-4">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2">
            Scope Risk Assessment
          </p>
          <p className={`text-2xl font-bold ${risk.color}`}>
            {risk.label}
          </p>
        </div>
        
        <RiskScoreGauge score={riskScore} size="lg" />
        
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-4 text-center max-w-md">
          This score reflects the complexity, hidden scope, and technical risks identified in the request
        </p>
      </div>
    </div>
  );
}

// Made with Bob
