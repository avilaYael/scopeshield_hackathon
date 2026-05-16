import SectionHeader from '@/components/ui/SectionHeader';

interface HiddenScopeProps {
  items: string[];
}

export default function HiddenScope({ items }: HiddenScopeProps) {
  return (
    <>
      <SectionHeader
        title="Hidden Scope"
        description="Implied but not mentioned"
        accentColor="amber"
        action={
          <div className="flex items-center gap-2 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded-md">
            <span className="text-lg font-bold text-amber-400 font-mono">{items.length}</span>
            <span className="text-xs font-medium text-amber-400/80 uppercase tracking-wider">Tasks</span>
          </div>
        }
      />
      
      <div className="space-y-1.5 pl-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-2.5 py-1.5 group"
          >
            <div className="flex-shrink-0 w-4 h-4 rounded border border-amber-500/30 bg-amber-500/5 flex items-center justify-center mt-0.5">
              <span className="text-xs font-mono font-semibold text-amber-400">{index + 1}</span>
            </div>
            <span className="text-zinc-300 leading-relaxed text-sm flex-1">{item}</span>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
