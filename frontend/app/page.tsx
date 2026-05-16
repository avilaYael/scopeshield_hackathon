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
  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);

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

  // Múltiples ejemplos de demo para variedad
  const demoExamples = [
    {
      request: "Solo agrega login con Google, cambia el dashboard y que se vea más moderno.",
      context: "React + Node.js app"
    },
    {
      request: "Necesito implementar un sistema de pagos con Stripe y que los usuarios puedan ver su historial de transacciones.",
      context: "Next.js + PostgreSQL"
    },
    {
      request: "Agrega notificaciones push y que los usuarios puedan subir archivos PDF.",
      context: "Vue.js + Firebase"
    },
    {
      request: "Implementa un chat en tiempo real y mejora el rendimiento de la base de datos.",
      context: "React + Socket.io + MongoDB"
    },
    {
      request: "Crea un sistema de roles y permisos, y agrega exportación de reportes en Excel.",
      context: "Django + React + PostgreSQL"
    }
  ];

  const currentDemo = demoExamples[currentDemoIndex];

  const loadExample = () => {
    setClientRequest(currentDemo.request);
    setRepoContext(currentDemo.context);
  };

  const tryDemo = async () => {
    // Rotar al siguiente ejemplo para el próximo demo
    const nextIndex = (currentDemoIndex + 1) % demoExamples.length;
    setCurrentDemoIndex(nextIndex);

    setError('');
    setIsAnalyzing(true);

    try {
      const result = await analyzeScopeRequest({
        clientRequest: currentDemo.request,
        repoContext: currentDemo.context,
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
    <div className="min-h-screen bg-zinc-950">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-zinc-50 mb-4 tracking-tight">
            ScopeShield
          </h1>
          <p className="text-lg text-zinc-400 max-w-2xl mx-auto mb-8 font-mono text-sm">
            Convert vague client requests into clear technical scope contracts
          </p>
          
          {/* Try Demo Button - Prominent */}
          <button
            onClick={tryDemo}
            disabled={isAnalyzing}
            className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-700 text-white font-semibold py-3 px-8 rounded-lg border border-emerald-400 hover:border-emerald-300 transition-all duration-200 text-base"
          >
            {isAnalyzing ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing Demo...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Demo Now
              </>
            )}
          </button>
          
          <p className="text-xs text-zinc-500 mt-4 font-mono">
            Or paste your own request below
          </p>
        </header>

        {/* Main Input Card */}
        <div className="border border-zinc-800 rounded-lg p-6 bg-zinc-900/30 mb-6">
          <div className="mb-5">
            <label 
              htmlFor="clientRequest" 
              className="block text-sm font-semibold text-zinc-50 mb-2 tracking-tight"
            >
              Client Request <span className="text-rose-400">*</span>
            </label>
            <textarea
              id="clientRequest"
              value={clientRequest}
              onChange={(e) => setClientRequest(e.target.value)}
              placeholder="Paste the vague client or stakeholder request here...&#10;&#10;Example: 'Just add Google login, change the dashboard and make it look more modern.'"
              className="w-full h-48 px-4 py-3 text-sm border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-900 text-zinc-100 resize-none font-mono placeholder:text-zinc-600"
              disabled={isAnalyzing}
            />
          </div>

          <div className="mb-5">
            <label 
              htmlFor="repoContext" 
              className="block text-sm font-semibold text-zinc-50 mb-2 tracking-tight"
            >
              Repository Context <span className="text-zinc-500 text-xs font-mono">(optional)</span>
            </label>
            <input
              id="repoContext"
              type="text"
              value={repoContext}
              onChange={(e) => setRepoContext(e.target.value)}
              placeholder="e.g., React + Node.js app, Django REST API, Next.js + PostgreSQL"
              className="w-full px-4 py-3 text-sm border border-zinc-700 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-zinc-900 text-zinc-100 font-mono placeholder:text-zinc-600"
              disabled={isAnalyzing}
            />
          </div>

          {error && (
            <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
              <p className="text-rose-400 text-sm font-mono">{error}</p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 disabled:bg-zinc-800 disabled:opacity-50 text-zinc-100 font-medium py-3 px-6 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing Scope...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                  Analyze Scope
                </>
              )}
            </button>
            
            <button
              onClick={loadExample}
              disabled={isAnalyzing}
              className="sm:w-auto bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-zinc-300 font-medium py-3 px-6 rounded-lg border border-zinc-700 hover:border-zinc-600 transition-all duration-200"
            >
              Load Example
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30">
            <div className="text-blue-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-100 mb-2 text-sm">Risk Analysis</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Identify technical risks and hidden scope before you commit
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30">
            <div className="text-emerald-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-100 mb-2 text-sm">Clear Questions</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Get clarifying questions to ask before starting work
            </p>
          </div>

          <div className="border border-zinc-800 rounded-lg p-5 bg-zinc-900/30">
            <div className="text-purple-400 mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-zinc-100 mb-2 text-sm">Client Reply</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Get a professional response ready to send to your client
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-zinc-500 font-mono">
          <p>© {new Date().getFullYear()} ScriptHunters. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

// Made with Bob
