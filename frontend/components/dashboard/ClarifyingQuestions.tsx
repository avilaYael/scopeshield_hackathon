'use client';

import { useState } from 'react';
import SectionHeader from '@/components/ui/SectionHeader';

interface ClarifyingQuestionsProps {
  questions: string[];
}

export default function ClarifyingQuestions({ questions }: ClarifyingQuestionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = questions.map((q, i) => `${i + 1}. ${q}`).join('\n\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <SectionHeader
        title="Clarifying Questions"
        description="Ask before starting"
        accentColor="blue"
        action={
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-zinc-800 rounded-md transition-colors border border-zinc-700"
            title="Copy questions"
          >
            {copied ? (
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        }
      />
      <ol className="space-y-2 pl-4">
        {questions.map((question, index) => (
          <li key={index} className="flex gap-2.5 text-sm">
            <span className="font-mono font-semibold text-blue-400 flex-shrink-0">
              {index + 1}.
            </span>
            <span className="text-zinc-300">{question}</span>
          </li>
        ))}
      </ol>
    </>
  );
}

// Made with Bob
