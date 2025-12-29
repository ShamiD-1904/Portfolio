import React, { useState, useEffect } from 'react'

const AnimationPopUp = ({ 
  text = "Hi! 👋", 
  appearDelay = 3000, 
  duration = null,
  top = '15%',
  left = '15%',
  tailPosition = '1rem' // left-4 = 1rem
}) => {
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    // Show bubble after delay
    const showTimer = setTimeout(() => {
      setShowBubble(true);
      
      // Hide bubble after duration (if duration is provided)
      if (duration) {
        setTimeout(() => setShowBubble(false), duration);
      }
    }, appearDelay);

    return () => clearTimeout(showTimer);
  }, [appearDelay, duration]);

  if (!showBubble) return null;

  return (
    <div 
      className="absolute z-50 speech-bubble"
      style={{
        top: top,
        left: left,
      }}
    >
      <div className="robot-bubble relative -top-20 left-76">
        {/* Glowing border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 opacity-60 blur-sm" />
        
        {/* Main bubble content */}
        <div className="relative rounded-2xl px-8 py-4 backdrop-blur-md border-2 border-cyan-50/30"
             style={{
               background: 'rgba(8, 8, 20, 0.9)',
               boxShadow: '0 0 30px rgba(0, 194, 168, 0.4), inset 0 0 20px rgba(0, 194, 168, 0.1)'
             }}>
          
          {/* Scan line effect */}
          <div className="scan-line" />
          
          {/* Message */}
          <div className="relative z-10">
            <div className="text-4xl font-bold bg-gradient-to-r from-cyan-50 via-blue-50 to-purple-50 bg-clip-text text-transparent mb-1" 
                 style={{ 
                   textShadow: '0 0 20px rgba(0, 194, 168, 0.5)',
                   fontFamily: 'monospace',
                   letterSpacing: '0.05em'
                 }}>
              &gt; {text}
            </div>
            {/* Digital dots */}
            <div className="flex gap-1 mt-2">
              <span className="w-2 h-2 rounded-full bg-cyan-50 animate-pulse" style={{ animationDelay: '0s' }} />
              <span className="w-2 h-2 rounded-full bg-blue-50 animate-pulse" style={{ animationDelay: '0.2s' }} />
              <span className="w-2 h-2 rounded-full bg-purple-50 animate-pulse" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-50" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-50" />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-50" />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-50" />
        </div>

        {/* Futuristic tail pointing to roflex flex-col items-center" style={{ left: tailPosition }}
        <div className="absolute top-full left-4 flex flex-col items-center">
          <div className="w-4 h-10 bg-gradient-to-b from-cyan-50 to-transparent" 
               style={{ boxShadow: '0 0 10px rgba(0, 194, 168, 0.6)' }} />
          <div className="w-2 h-2 rounded-full bg-cyan-50" 
               style={{ boxShadow: '0 0 15px rgba(0, 194, 168, 0.8)' }} />
        </div>
      </div>
    </div>
  );
}

export default AnimationPopUp
