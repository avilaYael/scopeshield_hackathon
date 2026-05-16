interface RiskScoreGaugeProps {
  score: number;
  size?: 'sm' | 'lg';
}

export default function RiskScoreGauge({ score, size = 'lg' }: RiskScoreGaugeProps) {
  // Determine color based on score (0-10 scale) with neon accents
  const getColor = (score: number) => {
    if (score <= 3) return { stroke: 'stroke-emerald-500', text: 'text-emerald-400' };
    if (score <= 6) return { stroke: 'stroke-amber-500', text: 'text-amber-400' };
    return { stroke: 'stroke-rose-500', text: 'text-rose-400' };
  };

  const colors = getColor(score);
  const percentage = (score / 10) * 100;

  const sizeClasses = size === 'lg' 
    ? 'w-28 h-28 text-3xl' 
    : 'w-20 h-20 text-2xl';

  return (
    <div className="flex flex-col items-center">
      <div className={`relative ${sizeClasses}`}>
        {/* Background circle */}
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            className="text-zinc-800"
          />
          {/* Progress circle */}
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            stroke="currentColor"
            strokeWidth="6"
            fill="none"
            strokeDasharray={`${percentage * 2.83} 283`}
            className={colors.stroke}
            strokeLinecap="round"
          />
        </svg>
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-bold font-mono ${colors.text}`}>{score.toFixed(1)}</span>
        </div>
      </div>
      <p className="text-xs text-zinc-500 font-mono mt-3">out of 10</p>
    </div>
  );
}

// Made with Bob
