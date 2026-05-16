import SectionHeader from '@/components/ui/SectionHeader';

interface ChecklistProps {
  items: string[];
}

export default function Checklist({ items }: ChecklistProps) {
  return (
    <>
      <SectionHeader
        title="Implementation Checklist"
        description="Complete task list"
        accentColor="emerald"
      />
      
      <div className="grid md:grid-cols-2 gap-2 pl-4">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-start gap-2.5 py-1.5 border-l-2 border-zinc-800 pl-2.5 hover:border-emerald-500/30 transition-colors group"
          >
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-3.5 h-3.5 text-emerald-500/50 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-sm text-zinc-300">
              {item.replace(/^✓\s*/, '')}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

// Made with Bob
