import SectionHeader from '@/components/ui/SectionHeader';

interface RequestSummaryProps {
  summary: string;
}

export default function RequestSummary({ summary }: RequestSummaryProps) {
  return (
    <>
      <SectionHeader
        title="Request Summary"
        description="What the client is asking for"
        accentColor="blue"
      />
      <div className="pl-4">
        <p className="text-zinc-300 leading-relaxed text-sm">
          {summary}
        </p>
      </div>
    </>
  );
}

// Made with Bob
