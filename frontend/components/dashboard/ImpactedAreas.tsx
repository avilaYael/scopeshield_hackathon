import SectionHeader from '@/components/ui/SectionHeader';
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
    <>
      <SectionHeader
        title="Impacted Areas"
        description="Files that will be affected"
        accentColor="purple"
      />
      <div className="space-y-3 pl-4">
        {areas.map((area, index) => (
          <div key={index} className="border-l-2 border-zinc-800 pl-3 py-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-zinc-100 text-sm">{area.area}</h3>
              <Badge variant={getComplexityVariant(area.complexity)} size="sm">
                {area.complexity}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {area.files.map((file, fileIndex) => (
                <code key={fileIndex} className="text-xs bg-zinc-800/50 text-zinc-400 px-2 py-0.5 rounded border border-zinc-700 font-mono">
                  {file}
                </code>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
