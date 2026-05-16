import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { Risk } from '@/types/scopeContract';

interface TechnicalRisksProps {
  risks: Risk[];
}

export default function TechnicalRisks({ risks }: TechnicalRisksProps) {
  const getSeverityVariant = (severity: string) => {
    if (severity === 'Alta') return 'danger';
    if (severity === 'Media') return 'warning';
    return 'success';
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'Alta') {
      return (
        <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      );
    }
    if (severity === 'Media') {
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
        <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    );
  };

  // Sort risks by severity (Alta first, then Media, then Baja)
  const sortedRisks = [...risks].sort((a, b) => {
    const severityOrder = { 'Alta': 0, 'Media': 1, 'Baja': 2 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });

  return (
    <Card>
      <div className="flex items-start gap-3 mb-6">
        <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Technical Risks
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Potential issues and challenges to consider
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        {sortedRisks.map((risk, index) => (
          <div 
            key={index} 
            className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/30 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-shadow"
          >
            {getSeverityIcon(risk.severity)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge variant="info" size="sm">{risk.type}</Badge>
                <Badge variant={getSeverityVariant(risk.severity)} size="sm">
                  {risk.severity} Severity
                </Badge>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {risk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Made with Bob
