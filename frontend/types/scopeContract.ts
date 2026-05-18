// TypeScript interfaces for ScopeShield Scope Contract

export interface ImpactedArea {
  area: string;
  files: string[];
  complexity: 'Low' | 'Medium' | 'High';
}

export interface Risk {
  type: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

export interface Estimate {
  complexity: string;
  timeRange: string;
  breakdown?: {
    [key: string]: string;
  };
}

export interface ImplementationStep {
  step: number;
  task: string;
  duration: string;
  dependencies: string[];
}

export interface ScopeContract {
  requestSummary: string;
  hiddenScope: string[];
  impactedAreas: ImpactedArea[];
  riskScore: number;
  risks: Risk[];
  clarifyingQuestions: string[];
  estimate: Estimate;
  implementationPlan: ImplementationStep[];
  clientReply: string;
  checklist: string[];
}

export interface AnalyzeRequest {
  clientRequest: string;
  repoContext?: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data: ScopeContract;
}

// Made with Bob
