import { AnalyzeRequest, ScopeContract } from '@/types/scopeContract';
import { mockScopeContract } from './mockData';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
const USE_MOCK_FALLBACK = process.env.NEXT_PUBLIC_USE_MOCK_FALLBACK === 'true';

/**
 * Analyze a client request and generate a Scope Contract
 * Tries to call the real backend API first.
 * The old fixed demo fallback is opt-in to avoid showing demo data for custom requests.
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
    console.error('Backend API call failed:', error);

    if (USE_MOCK_FALLBACK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        ...mockScopeContract,
        requestSummary: `Modo demo local: no se pudo conectar con el backend. Petición recibida: ${request.clientRequest}`,
      };
    }

    throw new Error('Backend API unavailable. Start the backend on port 8001 and try again.');
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
  } catch {
    return false;
  }
}

// Made with Bob
