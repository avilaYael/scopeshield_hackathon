import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { ImpactedArea } from '@/types/scopeContract';

interface ImpactedAreasProps {
  areas: ImpactedArea[];
}

export default function ImpactedAreas({ areas }: ImpactedAreasProps) {
  const getComplexityVariant = (complexity: string) => {
    if (complexity === 'Alta') return 'danger';
    if (complexity === 'Media') return 'warning';
    return 'success';
  };

  return (
    <Card>
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Impacted Areas
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Code areas and files that will be affected
          </p>
        </div>
      </div>
      <div className="space-y-4">
        {areas.map((area, index) => (
          <div key={index} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{area.area}</h3>
              <Badge variant={getComplexityVariant(area.complexity)}>
                {area.complexity} Complexity
              </Badge>
            </div>
            <div className="flex flex-wrap gap-2">
              {area.files.map((file, fileIndex) => (
                <code key={fileIndex} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-mono">
                  {file}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Made with Bob
