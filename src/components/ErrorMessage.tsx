import React from 'react';
import { FiAlertCircle, FiRefreshCw, FiClock } from 'react-icons/fi';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  const isRateLimited = message.toLowerCase().includes('rate limit');

  return (
    <div className="flex justify-center items-center min-h-[400px] animate-fade-in">
      <div className="max-w-md w-full glass-dark rounded-3xl p-8 text-center border-2 border-red-500/20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 mb-6 animate-pulse">
          {isRateLimited ? (
            <FiClock className="text-red-400 text-4xl" />
          ) : (
            <FiAlertCircle className="text-red-400 text-4xl" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-red-400 mb-3">
          {isRateLimited ? 'Slow Down!' : 'Oops! Something went wrong'}
        </h3>
        
        <p className="text-gray-300 mb-6 leading-relaxed">{message}</p>
        
        {isRateLimited && (
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
            <p className="text-yellow-300 text-sm">
              💡 <strong>Tip:</strong> Wait a few seconds between searches to avoid rate limiting.
            </p>
          </div>
        )}
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-red-500/50 font-semibold group"
          >
            <FiRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;