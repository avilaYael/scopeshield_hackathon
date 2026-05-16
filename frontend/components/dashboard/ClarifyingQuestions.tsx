'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

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
    <Card variant="highlighted">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-1">
            Clarifying Questions
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Ask these before starting work
          </p>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
          title="Copy questions"
        >
          {copied ? (
            <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          )}
        </button>
      </div>
      <ol className="space-y-3">
        {questions.map((question, index) => (
          <li key={index} className="flex gap-3">
            <span className="font-semibold text-blue-600 dark:text-blue-400 flex-shrink-0">
              {index + 1}.
            </span>
            <span className="text-slate-700 dark:text-slate-300">{question}</span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

// Made with Bob
