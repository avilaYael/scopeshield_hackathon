import { AnalyzeRequest, ScopeContract } from '@/types/scopeContract';
import { mockScopeContract } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Analyze a client request and generate a Scope Contract
 * Tries to call the real backend API first, falls back to mock data if it fails
 */
export async function analyzeScopeRequest(
  request: AnalyzeRequest
): Promise<ScopeContract> {
  try {
    // Try to call the real backend API
    const response = await fetch(`${API_BASE_URL}/api/scope/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    
    // Backend returns { success: true, data: ScopeContract }
    if (data.success && data.data) {
      return data.data;
    }
    
    throw new Error('Invalid response format from API');
  } catch (error) {
    console.warn('Backend API call failed, using mock data as fallback:', error);
    
    // Fallback to mock data with a small delay to simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockScopeContract;
  }
}

/**
 * Check if the backend API is available
 */
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
