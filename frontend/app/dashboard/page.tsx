'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScopeContract } from '@/types/scopeContract';
import SectionCard from '@/components/ui/SectionCard';
import RiskScoreGauge from '@/components/ui/RiskScoreGauge';
import RequestSummary from '@/components/dashboard/RequestSummary';
import HiddenScope from '@/components/dashboard/HiddenScope';
import ImpactedAreas from '@/components/dashboard/ImpactedAreas';
import TechnicalRisks from '@/components/dashboard/TechnicalRisks';
import ClarifyingQuestions from '@/components/dashboard/ClarifyingQuestions';
import Estimate from '@/components/dashboard/Estimate';
import ImplementationPlan from '@/components/dashboard/ImplementationPlan';
import ClientReply from '@/components/dashboard/ClientReply';
import Checklist from '@/components/dashboard/Checklist';

export default function Dashboard() {
  const router = useRouter();
  
  const [scopeContract, setScopeContract] = useState<ScopeContract | null>(() => {
    if (typeof window === 'undefined') return null;
    
    const stored = sessionStorage.getItem('scopeContract');
    if (!stored) return null;
    
    try {
      return JSON.parse(stored);
    } catch (error) {
      console.error('Failed to parse scope contract:', error);
      return null;
    }
  });
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!scopeContract) {
      router.push('/');
    }
  }, [scopeContract, router]);

  const handleNewAnalysis = () => {
    sessionStorage.removeItem('scopeContract');
    router.push('/');
  };

  const getRiskLevel = (score: number) => {
    if (score <= 3) return { label: 'Low Risk', color: 'text-emerald-400' };
    if (score <= 6) return { label: 'Medium Risk', color: 'text-amber-400' };
    return { label: 'High Risk', color: 'text-rose-400' };
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <p className="text-zinc-400 font-mono text-sm">Loading scope contract...</p>
        </div>
      </div>
    );
  }

  if (!scopeContract) {
    return null;
  }

  const risk = getRiskLevel(scopeContract.riskScore);

  return (
    <div className="min-h-screen bg-zinc-950 py-6">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
          <div>
            <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">
              Scope Contract
            </h1>
            <p className="text-xs text-zinc-500 font-mono mt-1">
              Technical analysis and risk assessment
            </p>
          </div>
          <button
            onClick={handleNewAnalysis}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-2 px-4 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center gap-2 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Analysis
          </button>
        </div>

        {/* Unified Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Row 1: Risk Score + Estimate */}
          <SectionCard>
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-3">
                Scope Risk Assessment
              </p>
              <p className={`text-2xl font-semibold ${risk.color} tracking-tight mb-4`}>
                {risk.label}
              </p>
              <RiskScoreGauge score={scopeContract.riskScore} size="lg" />
            </div>
          </SectionCard>

          <SectionCard>
            <Estimate estimate={scopeContract.estimate} />
          </SectionCard>

          {/* Row 2: Request Summary + Hidden Scope */}
          <SectionCard>
            <RequestSummary summary={scopeContract.requestSummary} />
          </SectionCard>

          <SectionCard>
            <HiddenScope items={scopeContract.hiddenScope} />
          </SectionCard>

          {/* Row 3: Impacted Areas (Full Width) */}
          <SectionCard className="lg:col-span-2">
            <ImpactedAreas areas={scopeContract.impactedAreas} />
          </SectionCard>

          {/* Row 4: Technical Risks + Clarifying Questions */}
          <SectionCard>
            <TechnicalRisks risks={scopeContract.risks} />
          </SectionCard>

          <SectionCard>
            <ClarifyingQuestions questions={scopeContract.clarifyingQuestions} />
          </SectionCard>

          {/* Row 5: Implementation Plan (Full Width) */}
          <SectionCard className="lg:col-span-2">
            <ImplementationPlan steps={scopeContract.implementationPlan} />
          </SectionCard>

          {/* Row 6: Client Reply (Full Width) */}
          <SectionCard className="lg:col-span-2">
            <ClientReply reply={scopeContract.clientReply} />
          </SectionCard>

          {/* Row 7: Checklist (Full Width) */}
          <SectionCard className="lg:col-span-2">
            <Checklist items={scopeContract.checklist} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
