import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, LockOpen, ExternalLink } from 'lucide-react';

type HackingSuccessAnimationProps = {
  isVisible: boolean;
  onComplete: () => void;
  projectUrl: string;
};

export const HackingSuccessAnimation = ({ 
  isVisible, 
  onComplete,
  projectUrl 
}: HackingSuccessAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'initial' | 'accessing' | 'success'>('initial');
  const [codeLines, setCodeLines] = useState<string[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStatus('initial');
      setCodeLines([]);
      return;
    }

    // Start access sequence
    const timer = setTimeout(() => setStatus('accessing'), 300);

    // Generate access sequence lines
    const lines = [
      '> Initializing repository access...',
      '> Verifying authentication...',
      '> Access credentials accepted...',
      '> Connecting to GitHub...',
      '> Access granted. Fetching repository data...',
      '> Repository: chess-engine',
      '> Status: Public',
      '> Access successful. Redirecting...'
    ];

    // Simulate typing effect
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < lines.length) {
        setCodeLines(prev => [...prev, lines[currentLine]]);
        setProgress(((currentLine + 1) / lines.length) * 100);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStatus('success');
          // Show success message and wait for user to close
          // Open the project URL in a new tab after a short delay
          // but don't close the modal automatically
          setTimeout(() => {
            window.open(projectUrl, '_blank');
          }, 1500);
        }, 1000);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible, onComplete, projectUrl]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-gray-900 border border-green-500/50 rounded-lg w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-green-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </div>
          <div className="text-sm text-gray-400 font-mono">
            {status === 'initial' && 'Initializing...'}
            {status === 'accessing' && 'Accessing Repository...'}
            {status === 'success' && 'Access Granted'}
          </div>
          <button 
            onClick={onComplete}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto bg-gray-900/50">
          {status === 'initial' && (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse">
                <LockOpen className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <p className="text-gray-400">Establishing secure connection...</p>
              </div>
            </div>
          )}

          {status === 'accessing' && (
            <div className="space-y-1">
              {codeLines.map((line, index) => (
                <div key={index} className="animate-fade-in">
                  <span className="text-green-400">$</span> {line}
                </div>
              ))}
              <div className="flex items-center mt-4">
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="ml-2 text-xs text-gray-400">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <motion.div 
                className="bg-green-500/20 p-4 rounded-full mb-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              >
                <Check className="w-12 h-12 text-green-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-green-400 mb-2">Access Granted</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Successfully accessed the repository. Opening in a new tab...
              </p>
              <div className="flex space-x-4">
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-sm font-medium text-white transition-colors flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Repository
                </a>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HackingSuccessAnimation;
