import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, AlertTriangle, X } from 'lucide-react';

type HackingAnimationProps = {
  isVisible: boolean;
  onComplete: () => void;
};

export const HackingAnimation = ({ isVisible, onComplete }: HackingAnimationProps) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'initial' | 'hacking' | 'failed'>('initial');
  const [codeLines, setCodeLines] = useState<string[]>([]);

  // Generate random code lines for the hacking effect
  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      setStatus('initial');
      setCodeLines([]);
      return;
    }

    // Start hacking sequence
    const timer = setTimeout(() => setStatus('hacking'), 500);

    // Generate random code lines
    const lines = [
      '> Initializing access protocols...',
      '> Bypassing security measures...',
      '> Decrypting repository access...',
      '> Attempting SSH key authentication...',
      '> Verifying credentials...',
      '> Access denied. Elevating privileges...',
      '> Deploying countermeasures...',
      '> Connection terminated by remote host.'
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
          setStatus('failed');
          // Removed auto-close functionality
        }, 1000);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div 
        className="bg-gray-900 border border-red-500/50 rounded-lg w-full max-w-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
      >
        <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-sm text-gray-400 font-mono">
            {status === 'initial' && 'Initializing...'}
            {status === 'hacking' && 'Accessing Repository...'}
            {status === 'failed' && 'Access Denied'}
          </div>
          <button 
            onClick={onComplete}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 font-mono text-sm text-green-400 h-64 overflow-y-auto bg-gray-900/50">
          {status === 'initial' && (
            <div className="h-full flex items-center justify-center">
              <div className="animate-pulse">
                <Lock className="w-8 h-8 mx-auto mb-2 text-gray-500" />
                <p className="text-gray-400">Establishing secure connection...</p>
              </div>
            </div>
          )}

          {status === 'hacking' && (
            <div className="space-y-1">
              {codeLines.map((line, index) => (
                <div key={index} className="animate-fade-in">
                  <span className="text-green-400">$</span> {line}
                </div>
              ))}
              <div className="flex items-center mt-4">
                <div className="w-full bg-gray-800 rounded-full h-2.5">
                  <motion.div 
                    className="bg-gradient-to-r from-red-500 to-yellow-500 h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <span className="ml-2 text-xs text-gray-400">{Math.round(progress)}%</span>
              </div>
            </div>
          )}

          {status === 'failed' && (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-red-500/20 p-4 rounded-full mb-4">
                <AlertTriangle className="w-12 h-12 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-2">Access Denied</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                This repository is private. Please contact the owner for access or check out my public repositories.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/TonyW-Y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md text-sm font-medium text-white transition-colors"
                >
                  View Public Repos
                </a>
                <button
                  onClick={onComplete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-sm font-medium text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default HackingAnimation;
