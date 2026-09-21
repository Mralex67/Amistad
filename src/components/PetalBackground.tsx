import React, { useEffect, useState } from 'react';

interface FloatingPetal {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  rotation: number;
  type: 'petal' | 'sparkle' | 'sun';
}

export const PetalBackground: React.FC = () => {
  const [elements, setElements] = useState<FloatingPetal[]>([]);

  useEffect(() => {
    // Generate organic floating elements
    const count = 28;
    const items: FloatingPetal[] = [];
    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 16 + 10,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 15,
        rotation: Math.random() * 360,
        type: i % 5 === 0 ? 'sparkle' : i % 7 === 0 ? 'sun' : 'petal',
      });
    }
    setElements(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Warm gentle ambient glow behind scene */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-40 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.45) 0%, rgba(245, 158, 11, 0.2) 50%, rgba(254, 240, 138, 0) 75%)'
        }}
      />

      {/* Floating petals and golden motes */}
      {elements.map((el) => {
        if (el.type === 'sparkle') {
          return (
            <div
              key={el.id}
              className="absolute rounded-full bg-amber-300 opacity-70 animate-pulse"
              style={{
                left: `${el.left}%`,
                top: `${(el.id * 13) % 95}%`,
                width: `${el.size * 0.4}px`,
                height: `${el.size * 0.4}px`,
                filter: 'drop-shadow(0 0 6px rgba(245, 158, 11, 0.8))',
                animationDuration: `${el.duration * 0.3}s`,
                animationDelay: `${el.delay}s`,
              }}
            />
          );
        }

        if (el.type === 'sun') {
          return (
            <div
              key={el.id}
              className="absolute text-amber-400 opacity-40 select-none"
              style={{
                left: `${el.left}%`,
                bottom: '-20px',
                fontSize: `${el.size * 1.1}px`,
                animation: `petalDrift ${el.duration * 1.2}s linear infinite`,
                animationDelay: `${el.delay}s`,
              }}
            >
              ✦
            </div>
          );
        }

        // Yellow flower petal svg
        return (
          <div
            key={el.id}
            className="absolute select-none"
            style={{
              left: `${el.left}%`,
              top: '-30px',
              animation: `petalDrift ${el.duration}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              animationDelay: `${el.delay}s`,
            }}
          >
            <svg
              width={el.size}
              height={el.size * 1.5}
              viewBox="0 0 24 36"
              fill="none"
              style={{
                transform: `rotate(${el.rotation}deg)`,
                opacity: 0.8,
              }}
            >
              <defs>
                <linearGradient id={`petal-grad-${el.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#EAB308" />
                </linearGradient>
              </defs>
              <path
                d="M12 0 C18 8, 22 18, 18 28 C15 34, 9 34, 6 28 C2 18, 6 8, 12 0 Z"
                fill={`url(#petal-grad-${el.id})`}
                filter="drop-shadow(0 2px 3px rgba(180, 83, 9, 0.15))"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};
