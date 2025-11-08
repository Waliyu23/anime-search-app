import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from(new Array(12)).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="glass-dark rounded-2xl overflow-hidden">
            {/* Image Skeleton */}
            <div className="h-80 bg-gradient-to-br from-dark-800/50 to-dark-900/50 shimmer relative">
              <div className="absolute top-4 right-4 w-16 h-8 bg-white/5 rounded-xl"></div>
              <div className="absolute top-4 left-4 w-12 h-6 bg-white/5 rounded-lg"></div>
            </div>
            
            {/* Content Skeleton */}
            <div className="p-5 space-y-3">
              {/* Title lines */}
              <div className="space-y-2">
                <div className="h-5 bg-white/5 rounded-lg w-full"></div>
                <div className="h-5 bg-white/5 rounded-lg w-3/4"></div>
              </div>
              
              {/* Subtitle */}
              <div className="h-4 bg-white/5 rounded-lg w-1/2"></div>
              
              {/* Tags */}
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-white/5 rounded-lg"></div>
                <div className="h-6 w-20 bg-white/5 rounded-lg"></div>
              </div>
              
              {/* Synopsis lines */}
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-white/5 rounded w-full"></div>
                <div className="h-3 bg-white/5 rounded w-full"></div>
                <div className="h-3 bg-white/5 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;