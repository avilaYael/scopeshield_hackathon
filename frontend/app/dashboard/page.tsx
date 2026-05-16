'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScopeContract } from '@/types/scopeContract';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
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
  const [scopeContract, setScopeContract] = useState<ScopeContract | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get scope contract from sessionStorage
    const stored = sessionStorage.getItem('scopeContract');
    
    if (!stored) {
      // Redirect to home if no data
      router.push('/');
      return;
    }

    try {
      const data = JSON.parse(stored);
      setScopeContract(data);
    } catch (error) {
      console.error('Failed to parse scope contract:', error);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleNewAnalysis = () => {
    sessionStorage.removeItem('scopeContract');
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading scope contract...</p>
        </div>
      </div>
    );
  }

  if (!scopeContract) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with Prominent Risk Score */}
        <DashboardHeader 
          riskScore={scopeContract.riskScore}
          onNewAnalysis={handleNewAnalysis}
        />

        {/* Priority Sections - Full Width */}
        <div className="space-y-6 mb-6">
          <RequestSummary summary={scopeContract.requestSummary} />
          <HiddenScope items={scopeContract.hiddenScope} />
          <TechnicalRisks risks={scopeContract.risks} />
        </div>

        {/* Two Column Layout for Supporting Info */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <ImpactedAreas areas={scopeContract.impactedAreas} />
            <ImplementationPlan steps={scopeContract.implementationPlan} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            <Estimate estimate={scopeContract.estimate} />
            <ClarifyingQuestions questions={scopeContract.clarifyingQuestions} />
          </div>
        </div>

        {/* Action Sections - Full Width */}
        <div className="space-y-6">
          <ClientReply reply={scopeContract.clientReply} />
          <Checklist items={scopeContract.checklist} />
        </div>
      </div>
    </div>
  );
}

// Made with Bob
