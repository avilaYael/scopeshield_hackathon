interface RiskScoreGaugeProps {
  score: number;
  size?: 'sm' | 'lg';
}

export default function RiskScoreGauge({ score, size = 'lg' }: RiskScoreGaugeProps) {
  // Determine color based on score (0-10 scale)
  const getColor = (score: number) => {
    if (score <= 3) return { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-500' };
    if (score <= 6) return { bg: 'bg-amber-500', text: 'text-amber-600', ring: 'ring-amber-500' };
    return { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-500' };
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return 'Low Risk';
    if (score <= 6) return 'Medium Risk';
    return 'High Risk';
  };

  const colors = getColor(score);
  const percentage = (score / 10) * 100;

  const sizeClasses = size === 'lg' 
    ? 'w-32 h-32 text-4xl' 
    : 'w-20 h-20 text-2xl';

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses}`}>
        {/* Background circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-slate-200 dark:text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeDasharray={`${percentage * 2.83} 283`}
            className={colors.bg}
            strokeLinecap="round"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold ${colors.text}`}>{score.toFixed(1)}</span>
        </div>
      </div>
      <div className="text-center">
        <p className={`font-semibold ${colors.text}`}>{getRiskLevel(score)}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">Scope Risk Score</p>
      </div>
    </div>
  );
}

// Made with Bob
