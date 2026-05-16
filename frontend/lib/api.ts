import { AnalyzeRequest, ScopeContract } from '@/types/scopeContract';
import { mockScopeContract } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function analyzeScopeRequest(
  request: AnalyzeRequest
): Promise<ScopeContract> {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return mockScopeContract;
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

// Made with Bob
