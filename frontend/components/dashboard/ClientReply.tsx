'use client';

import { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

interface ClientReplyProps {
  reply: string;
}

export default function ClientReply({ reply }: ClientReplyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reply);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SectionHeader
        title="Professional Client Reply"
        description="Ready to send"
        accentColor="blue"
        action={
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all font-medium text-xs border ${
              copied 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </>
            )}
          </button>
        }
      />
      
      <div className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 pl-7">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-zinc-800">
          <svg className="w-3 h-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
            Email Preview
          </span>
          <span className="ml-auto text-xs text-zinc-600 font-mono">
            {reply.length} chars
          </span>
        </div>
        <pre className="whitespace-pre-wrap text-sm text-zinc-300 leading-relaxed font-sans">
          {reply}
        </pre>
      </div>
      
      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500 font-mono pl-4">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Includes scope clarification, questions, and timeline</span>
      </div>
    </>
  );
}

// Made with Bob
