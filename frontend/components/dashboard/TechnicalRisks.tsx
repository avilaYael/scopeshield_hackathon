import SectionHeader from '@/components/ui/SectionHeader';
import Badge from '@/components/ui/Badge';
import { Risk } from '@/types/scopeContract';

interface TechnicalRisksProps {
  risks: Risk[];
}

export default function TechnicalRisks({ risks }: TechnicalRisksProps) {
  const getSeverityVariant = (severity: string) => {
    if (severity === 'High') return 'danger';
    if (severity === 'Medium') return 'warning';
    return 'success';
  };

  // Sort risks by severity (High first, then Medium, then Low)
  const sortedRisks = [...risks].sort((a, b) => {
    const severityOrder = { 'High': 0, 'Medium': 1, 'Low': 2 };
    return severityOrder[a.severity as keyof typeof severityOrder] - severityOrder[b.severity as keyof typeof severityOrder];
  });

  return (
    <>
      <SectionHeader
        title="Technical Risks"
        description="Potential issues to consider"
        accentColor="rose"
      />
      
      <div className="space-y-2 pl-4">
        {sortedRisks.map((risk, index) => (
          <div 
            key={index} 
            className="flex items-start gap-3 py-2 border-l-2 border-zinc-800 pl-3 hover:border-zinc-700 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <Badge variant="info" size="sm">{risk.type}</Badge>
                <Badge variant={getSeverityVariant(risk.severity)} size="sm">
                  {risk.severity}
                </Badge>
              </div>
              <p className="text-zinc-300 leading-relaxed text-sm">
                {risk.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
