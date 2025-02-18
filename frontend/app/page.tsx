'use client';

import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<{
    ptPT: number;
    ptBR: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCompare = async () => {
    if (!text.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Failed to classify text');
      }

      const probability = await response.json();
      setResults({
        ptPT: probability,
        ptBR: 1 - probability,
      });
    } catch (error) {
      console.error('Error comparing text:', error);
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleCompare();
    }
  };

  const clearText = () => {
    setText('');
    setResults(null);
  };

  return (
    <main className="pt-12 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-dark-blue mb-4">
            Portuguese Variety Identifier
          </h1>
          <p className="text-gray-600">
            Identify whether a text is written in European Portuguese (PT-PT) or Brazilian Portuguese (PT-BR)
          </p>
        </div>

        {/* Input Container */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex min-h-[180px] w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light-blue focus-visible:ring-offset-2"
              placeholder="Enter text to classify (Press ⌘+Return to classify)"
              autoFocus
            />
          </div>
        </div>

        {/* Results */}
        {results && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="space-y-4">
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-light-blue transition-all duration-500 rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${results.ptPT * 100}%` }}
                >
                  <span className="text-white font-medium">
                    PT-PT: {(results.ptPT * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="relative h-8 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="absolute top-0 left-0 h-full bg-dark-blue transition-all duration-500 rounded-full flex items-center justify-end pr-4"
                  style={{ width: `${results.ptBR * 100}%` }}
                >
                  <span className="text-white font-medium">
                    PT-BR: {(results.ptBR * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCompare}
            disabled={isLoading}
            className="px-6 py-3 bg-light-blue text-white rounded-lg hover:bg-blue-500 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Classifying...' : 'Classify'}
          </button>
          <button
            onClick={clearText}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Clear
          </button>
        </div>
      </div>
    </main>
  );
} 