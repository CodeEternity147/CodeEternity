import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Unleashing Innovation...');

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    const textInterval = setInterval(() => {
      const texts = [
        'Unleashing Innovation...',
        'Powering Your Future...',
        'Crafting Excellence...',
        'Igniting Success...',
        'Welcome to the Future of Tech!'
      ];
      setLoadingText(texts[Math.floor(Math.random() * texts.length)]);
    }, 500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Enhanced background pattern with depth */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid-pattern"></div>
      </div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 animate-gradient-shift"></div>

      {/* Enhanced floating elements with trails */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-purple-500/10 rounded-full animate-float-slow blur-sm"></div>
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full animate-float-slow"></div>
        
        <div className="absolute bottom-1/3 right-1/3 w-16 h-16 bg-blue-500/10 rounded-full animate-float-slow blur-sm" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-12 h-12 bg-blue-500/20 rounded-full animate-float-slow" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute top-2/3 right-1/4 w-12 h-12 bg-indigo-500/10 rounded-full animate-float-slow blur-sm" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-indigo-500/20 rounded-full animate-float-slow" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Orbital elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 border border-purple-500/10 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border border-purple-500/5 rounded-full animate-spin-reverse"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 text-center max-w-sm w-full px-6">
        {/* Logo container with enhanced premium effects */}
        <div className="mb-10 relative">
          {/* Multi-layered glow */}
          <div className="absolute inset-0 bg-purple-500/20 rounded-3xl blur-2xl animate-pulse-slow"></div>
          <div className="absolute inset-1 bg-purple-400/10 rounded-2xl blur-xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          
          <div className="relative bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl shadow-purple-500/20 animate-card-hover">
            {/* Enhanced animated border with multiple layers */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent animate-shimmer"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-shimmer-vertical"></div>
            </div>
            
            {/* Enhanced main logo */}
            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight relative transform hover:scale-105 transition-transform duration-300">
              <span className="text-purple-400 animate-glow-enhanced drop-shadow-2xl">
                CodeEternity
              </span>
              {/* Letter spacing effect */}
              <div className="absolute inset-0 text-purple-300/30 animate-text-wave">
                CodeEternity
              </div>
            </h1>
            
            {/* Enhanced tagline */}
            <p className="text-slate-300 text-sm font-medium animate-fade-gentle">
              Trained. Placed. Backed by CodeEternity.
            </p>
            
            {/* Enhanced animated accent line */}
            <div className="relative w-12 h-0.5 mx-auto mt-3 overflow-hidden rounded-full">
              <div className="absolute inset-0 bg-purple-500 animate-pulse shadow-lg shadow-purple-500/50"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-slide-accent"></div>
            </div>
          </div>
        </div>

        {/* Enhanced progress section */}
        <div className="space-y-6">
          {/* Premium circular progress with multiple rings */}
          <div className="relative w-28 h-28 mx-auto">
            {/* Multi-layered outer glow */}
            <div className="absolute inset-0 bg-purple-500/30 rounded-full blur-xl animate-pulse-slow"></div>
            <div className="absolute inset-2 bg-purple-400/20 rounded-full blur-lg animate-pulse-slow" style={{ animationDelay: '0.5s' }}></div>
            
            <svg className="w-28 h-28 transform -rotate-90 relative z-10" viewBox="0 0 100 100">
              {/* Background rings */}
              <circle
                cx="50" cy="50" r="45"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-slate-800/50"
              />
              <circle
                cx="50" cy="50" r="42"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-slate-700"
              />
              
              {/* Progress ring with gradient */}
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#7c3aed" />
                </linearGradient>
              </defs>
              <circle
                cx="50" cy="50" r="42"
                stroke="url(#progressGradient)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                className="drop-shadow-lg filter"
                style={{
                  strokeDasharray: `${2 * Math.PI * 42}`,
                  strokeDashoffset: `${2 * Math.PI * 42 * (1 - progress / 100)}`,
                  transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
              
              {/* Animated progress indicator */}
              <circle
                cx={50 + 42 * Math.cos(2 * Math.PI * (progress / 100) - Math.PI / 2)}
                cy={50 + 42 * Math.sin(2 * Math.PI * (progress / 100) - Math.PI / 2)}
                r="3"
                fill="#a855f7"
                className="animate-pulse drop-shadow-lg"
              />
            </svg>
            
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <span className="text-purple-300 font-bold text-xl drop-shadow-lg animate-number-pop">{progress}%</span>
                <div className="w-8 h-0.5 bg-purple-500/50 mx-auto mt-1 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced loading bar with premium effects */}
          <div className="w-full max-w-xs mx-auto">
            <div className="relative h-3 bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/30 shadow-inner backdrop-blur-sm">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-700/20 to-slate-600/20"></div>
              
              <div 
                className="relative h-full bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 rounded-full transition-all duration-500 ease-out shadow-lg shadow-purple-500/30"
                style={{ width: `${progress}%` }}
              >
                {/* Inner glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-300/40 via-white/30 to-purple-300/40 animate-pulse-gentle rounded-full"></div>
                
                {/* Animated highlight */}
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-slide-highlight rounded-full"></div>
                
                {/* Progress sparkles */}
                <div className="absolute inset-0 overflow-hidden rounded-full">
                  <div className="absolute right-0 top-1/2 w-1 h-1 bg-white rounded-full animate-sparkle transform -translate-y-1/2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced loading text with sophisticated animation */}
          <div className="h-6 relative">
            <p className="text-slate-300 text-sm font-medium animate-text-fade tracking-wide">
              {loadingText}
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-text-shine pointer-events-none"></div>
          </div>

          {/* Premium animated dots with trailing effect */}
          <div className="flex justify-center space-x-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="relative">
                <div
                  className="w-3 h-3 bg-purple-500 rounded-full animate-bounce-premium shadow-xl shadow-purple-500/50"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.6s'
                  }}
                ></div>
                <div
                  className="absolute inset-0 w-3 h-3 bg-purple-400/50 rounded-full animate-bounce-premium blur-sm"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: '1.6s'
                  }}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced floating code element with multiple symbols */}
        <div className="absolute -top-6 -right-6 space-y-2 animate-float-gentle">
          <div className="text-purple-500/30 font-mono text-sm">{'</>'}</div>
          <div className="text-blue-500/25 font-mono text-xs" style={{ animationDelay: '1s' }}>{'{ }'}</div>
          <div className="text-indigo-500/20 font-mono text-xs" style={{ animationDelay: '2s' }}>{'[ ]'}</div>
        </div>
      </div>

      {/* Enhanced premium status indicators */}
      <div className="absolute bottom-6 left-6 opacity-50">
        <div className="flex items-center space-x-3 text-slate-400 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/30">
          <div className="relative">
            <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
            <div className="absolute inset-0 w-2.5 h-2.5 bg-purple-400 rounded-full animate-ping"></div>
          </div>
          <div className="text-xs font-mono font-medium tracking-wider">PREMIUM</div>
        </div>
      </div>

      <div className="absolute top-6 right-6 opacity-50">
        <div className="flex items-center space-x-3 text-slate-400 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-slate-700/30">
          <div className="relative">
            <div className="w-2 h-2 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
            <div className="absolute inset-0 w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
          </div>
          <div className="text-xs font-mono font-medium tracking-wider">POWERED</div>
        </div>
      </div>

      <style jsx>{`
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(139, 92, 246, 0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.12) 1px, transparent 1px);
          background-size: 40px 40px;
          width: 100%;
          height: 100%;
          animation: grid-move 20s ease-in-out infinite;
        }

        @keyframes grid-move {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, 10px); }
        }

        @keyframes gradient-shift {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.1; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(300%); }
        }

        @keyframes shimmer-vertical {
          0% { transform: translateY(-200%); }
          100% { transform: translateY(300%); }
        }

        @keyframes slide-accent {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes slide-highlight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes float-slow {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg); 
            opacity: 0.4;
          }
          50% { 
            transform: translateY(-25px) scale(1.15) rotate(180deg); 
            opacity: 0.1;
          }
        }

        @keyframes float-gentle {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-15px) rotate(10deg); 
            opacity: 0.6;
          }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        @keyframes glow-enhanced {
          0%, 100% { 
            text-shadow: 
              0 0 10px rgba(168, 85, 247, 0.4),
              0 0 20px rgba(168, 85, 247, 0.2),
              0 0 30px rgba(168, 85, 247, 0.1);
          }
          50% { 
            text-shadow: 
              0 0 20px rgba(168, 85, 247, 0.6),
              0 0 30px rgba(168, 85, 247, 0.4),
              0 0 40px rgba(168, 85, 247, 0.2);
          }
        }

        @keyframes text-wave {
          0%, 100% { transform: translateY(0px); opacity: 0.1; }
          50% { transform: translateY(-2px); opacity: 0.3; }
        }

        @keyframes text-fade {
          0%, 100% { opacity: 0.8; transform: translateY(0px); }
          50% { opacity: 1; transform: translateY(-1px); }
        }

        @keyframes text-shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.1; transform: scale(1.1); }
        }

        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }

        @keyframes fade-gentle {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }

        @keyframes card-hover {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }

        @keyframes number-pop {
          0%, 90%, 100% { transform: scale(1); }
          95% { transform: scale(1.05); }
        }

        @keyframes bounce-premium {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          40%, 43% {
            transform: translate3d(0, -15px, 0) scale(1.1);
          }
          70% {
            transform: translate3d(0, -8px, 0) scale(1.05);
          }
          90% {
            transform: translate3d(0, -2px, 0) scale(1.02);
          }
        }

        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 4s ease-in-out infinite;
        }

        .animate-shimmer-vertical {
          animation: shimmer-vertical 3s ease-in-out infinite;
        }

        .animate-slide-accent {
          animation: slide-accent 3s ease-in-out infinite;
        }

        .animate-slide-highlight {
          animation: slide-highlight 2.5s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 10s ease-in-out infinite;
        }

        .animate-float-gentle {
          animation: float-gentle 5s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 20s linear infinite;
        }

        .animate-glow-enhanced {
          animation: glow-enhanced 3s ease-in-out infinite;
        }

        .animate-text-wave {
          animation: text-wave 4s ease-in-out infinite;
        }

        .animate-text-fade {
          animation: text-fade 3s ease-in-out infinite;
        }

        .animate-text-shine {
          animation: text-shine 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }

        .animate-fade-gentle {
          animation: fade-gentle 3s ease-in-out infinite;
        }

        .animate-card-hover {
          animation: card-hover 6s ease-in-out infinite;
        }

        .animate-number-pop {
          animation: number-pop 2s ease-in-out infinite;
        }

        .animate-bounce-premium {
          animation: bounce-premium 2s ease-in-out infinite;
        }

        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;