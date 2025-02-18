'use client';

import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [text, setText] = useState('');
  const [results, setResults] = useState({
    ptPT: 0,
    ptBR: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasClassified, setHasClassified] = useState(false);

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
      setHasClassified(true);
    } catch (error) {
      console.error('Error comparing text:', error);
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
    setResults({ ptPT: 0, ptBR: 0 });
    setHasClassified(false);
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
        <div className="mb-8">
          <Textarea
            value={text}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
            onKeyDown={handleKeyPress}
            className="min-h-[120px] resize-none focus-visible:ring-light-blue"
            placeholder="Enter text to classify (Press ⌘+Return to classify)"
            autoFocus
          />
        </div>

        {/* Results - Always visible */}
        <div className="mb-8">
          <div className="relative h-14 bg-gray-100 rounded-full overflow-hidden">
            {/* Fixed Position Labels */}
            <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
              <span className={`font-medium whitespace-nowrap ${hasClassified ? 'text-white' : 'text-gray-400'}`}>
                PT-PT: {hasClassified ? (results.ptPT * 100).toFixed(1) : '0.0'}%
              </span>
              <span className={`font-medium whitespace-nowrap ${hasClassified ? 'text-white' : 'text-gray-400'}`}>
                PT-BR: {hasClassified ? (results.ptBR * 100).toFixed(1) : '0.0'}%
              </span>
            </div>

            {/* PT-PT Score (Left side) */}
            <div 
              className={`absolute top-0 left-0 h-full bg-light-blue transition-all duration-500
                ${!hasClassified ? 'opacity-30' : ''}`}
              style={{ width: `${results.ptPT * 100}%` }}
            />
            
            {/* PT-BR Score (Right side) */}
            <div 
              className={`absolute top-0 right-0 h-full bg-dark-blue transition-all duration-500
                ${!hasClassified ? 'opacity-30' : ''}`}
              style={{ width: `${results.ptBR * 100}%` }}
            />
          </div>
        </div>

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