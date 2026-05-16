'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { analyzeScopeRequest } from '@/lib/api';

export default function Home() {
  const router = useRouter();
  const [clientRequest, setClientRequest] = useState('');
  const [repoContext, setRepoContext] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    // Validate that user entered a client request
    if (!clientRequest.trim()) {
      setError('Please enter a client request');
      return;
    }

    setError('');
    setIsAnalyzing(true);

    try {
      const result = await analyzeScopeRequest({
        clientRequest,
        repoContext: repoContext || undefined,
      });

      // Store result in sessionStorage for the dashboard
      sessionStorage.setItem('scopeContract', JSON.stringify(result));
      
      // Navigate to dashboard
      router.push('/dashboard');
    } catch (err) {
      // Show useful error message if the request fails
      setError('Unable to analyze scope. The backend may be unavailable. Please check that the backend is running or try again later.');
      console.error('Error analyzing scope:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exampleRequest = "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.";

  const loadExample = () => {
    setClientRequest(exampleRequest);
    setRepoContext('React + Node.js app');
  };

  const tryDemo = async () => {
    setClientRequest(exampleRequest);
    setRepoContext('React + Node.js app');
    setError('');
    setIsAnalyzing(true);

    try {
      const result = await analyzeScopeRequest({
        clientRequest: exampleRequest,
        repoContext: 'React + Node.js app',
      });

      sessionStorage.setItem('scopeContract', JSON.stringify(result));
      router.push('/dashboard');
    } catch (err) {
      setError('Unable to analyze scope. The backend may be unavailable. Please check that the backend is running or try again later.');
      console.error('Error analyzing scope:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-50 mb-4">
            ScopeShield
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Convert vague client requests into clear technical scope contracts
          </p>
          
          {/* Try Demo Button - Prominent */}
          <button
            onClick={tryDemo}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-blue-400 disabled:to-blue-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 text-lg"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Demo...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Demo Now
              </>
            )}
          </button>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Or paste your own request below
          </p>
        </header>

        {/* Main Input Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-6">
          <div className="mb-6">
            <label 
              htmlFor="clientRequest" 
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Client Request <span className="text-red-500">*</span>
            </label>
            <textarea
              id="clientRequest"
              value={clientRequest}
              onChange={(e) => setClientRequest(e.target.value)}
              placeholder="Paste the vague client or stakeholder request here...&#10;&#10;Example: 'Just add Google login, change the dashboard and make it look more modern.'"
              className="w-full h-48 px-4 py-3 text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100 resize-none font-mono"
              disabled={isAnalyzing}
            />
          </div>

          <div className="mb-6">
            <label 
              htmlFor="repoContext" 
              className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Repository Context <span className="text-slate-400 text-xs">(optional)</span>
            </label>
            <input
              id="repoContext"
              type="text"
              value={repoContext}
              onChange={(e) => setRepoContext(e.target.value)}
              placeholder="e.g., React + Node.js app, Django REST API, Next.js + PostgreSQL"
              className="w-full px-4 py-3 text-base border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-slate-100"
              disabled={isAnalyzing}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Scope...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Analyze Scope
                </>
              )}
            </button>
            
            <button
              onClick={loadExample}
              disabled={isAnalyzing}
              className="sm:w-auto bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
            >
              Load Example
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <div className="text-blue-600 dark:text-blue-400 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Risk Analysis</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Identify technical risks and hidden scope before you commit
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <div className="text-green-600 dark:text-green-400 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Clear Questions</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get clarifying questions to ask before starting work
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
            <div className="text-purple-600 dark:text-purple-400 mb-3">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">Client Reply</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Get a professional response ready to send to your client
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} ScriptHunters. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Made with Bob
