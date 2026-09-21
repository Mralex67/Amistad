import React from 'react';
import { motion } from 'motion/react';

// Procedural 3D Radiant Sunflower / Gerbera with layered petals
export const Sunflower3D: React.FC<{
  scale?: number;
  bloomProgress: number;
  delay?: number;
  className?: string;
  onClick?: () => void;
}> = ({ scale = 1, bloomProgress, delay = 0, className = '', onClick }) => {
  const numOuterPetals = 16;
  const numInnerPetals = 14;

  return (
    <motion.div
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${className}`}
      initial={{ scale: 0, rotate: -30, opacity: 0 }}
      animate={{
        scale: bloomProgress >= 1 ? scale : 0,
        rotate: bloomProgress >= 1 ? 0 : -30,
        opacity: bloomProgress >= 1 ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        delay,
      }}
    >
      {/* Golden Aura Glow */}
      <div 
        className="absolute w-36 h-36 rounded-full pointer-events-none opacity-60 blur-xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.8) 0%, rgba(245, 158, 11, 0.3) 60%, transparent 80%)',
          animationDuration: '3s'
        }}
      />

      {/* Outer Petals Ring */}
      <div className="absolute w-32 h-32 flex items-center justify-center pointer-events-none">
        {Array.from({ length: numOuterPetals }).map((_, i) => {
          const angle = (360 / numOuterPetals) * i;
          return (
            <motion.div
              key={`outer-${i}`}
              className="absolute origin-bottom w-5 h-16 rounded-t-full shadow-sm"
              style={{
                background: 'linear-gradient(180deg, #FDE047 0%, #FACC15 45%, #EAB308 85%, #CA8A04 100%)',
                transform: `rotate(${angle}deg) translateY(-28px)`,
                boxShadow: '0 2px 5px rgba(180, 83, 9, 0.25)',
              }}
              initial={{ scaleY: 0, scaleX: 0 }}
              animate={{
                scaleY: bloomProgress >= 1 ? 1 : 0,
                scaleX: bloomProgress >= 1 ? 1 : 0,
              }}
              transition={{
                duration: 0.6,
                delay: delay + 0.1 + i * 0.02,
                ease: 'easeOut',
              }}
            >
              {/* Petal center vein highlight */}
              <div className="w-[1.5px] h-full mx-auto bg-amber-200/60" />
            </motion.div>
          );
        })}
      </div>

      {/* Inner Petals Ring (Staggered angle for lush volume) */}
      <div className="absolute w-28 h-28 flex items-center justify-center pointer-events-none">
        {Array.from({ length: numInnerPetals }).map((_, i) => {
          const angle = (360 / numInnerPetals) * i + 12;
          return (
            <motion.div
              key={`inner-${i}`}
              className="absolute origin-bottom w-4.5 h-13 rounded-t-full shadow-sm"
              style={{
                background: 'linear-gradient(180deg, #FEF08A 0%, #FACC15 50%, #D97706 100%)',
                transform: `rotate(${angle}deg) translateY(-22px)`,
              }}
              initial={{ scaleY: 0 }}
              animate={{
                scaleY: bloomProgress >= 1 ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                delay: delay + 0.25 + i * 0.02,
                ease: 'easeOut',
              }}
            >
              <div className="w-[1px] h-full mx-auto bg-yellow-100/70" />
            </motion.div>
          );
        })}
      </div>

      {/* Sunflower Center Disc (Rich bronze & chocolate texture) */}
      <motion.div
        className="relative w-14 h-14 rounded-full shadow-inner flex items-center justify-center z-10"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #92400E 0%, #78350F 50%, #451A03 90%, #291102 100%)',
          boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.3)',
        }}
        initial={{ scale: 0 }}
        animate={{ scale: bloomProgress >= 1 ? 1 : 0 }}
        transition={{ duration: 0.5, delay: delay + 0.1 }}
      >
        {/* Disc floret golden pollen ring */}
        <div className="w-10 h-10 rounded-full border-2 border-dashed border-amber-400/60 opacity-80" />
        <div className="w-6 h-6 rounded-full bg-[#3F1A04] shadow-inner" />
      </motion.div>
    </motion.div>
  );
};

// Procedural 3D Layered Yellow Rose
export const Rose3D: React.FC<{
  scale?: number;
  bloomProgress: number;
  delay?: number;
  className?: string;
  onClick?: () => void;
}> = ({ scale = 1, bloomProgress, delay = 0, className = '', onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: bloomProgress >= 1 ? scale : 0,
        opacity: bloomProgress >= 1 ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 240,
        damping: 20,
        delay,
      }}
    >
      {/* Outer Rose Petals */}
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Layer 1 - Outer Petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={`rose-outer-${i}`}
            className="absolute w-12 h-13 rounded-[45%_55%_50%_50%] origin-center"
            style={{
              background: 'linear-gradient(135deg, #FEF08A 0%, #FACC15 60%, #EAB308 100%)',
              transform: `rotate(${angle}deg) translate(14px, -12px) rotate(15deg)`,
              boxShadow: '0 3px 6px rgba(180, 83, 9, 0.2)',
              border: '1px solid rgba(254, 240, 138, 0.5)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: bloomProgress >= 1 ? 1 : 0 }}
            transition={{ duration: 0.6, delay: delay + i * 0.04 }}
          />
        ))}

        {/* Layer 2 - Mid Petals */}
        {[36, 108, 180, 252, 324].map((angle, i) => (
          <motion.div
            key={`rose-mid-${i}`}
            className="absolute w-9 h-10 rounded-[50%_50%_45%_55%] origin-center"
            style={{
              background: 'linear-gradient(145deg, #FFFBEB 0%, #FDE047 50%, #F59E0B 100%)',
              transform: `rotate(${angle}deg) translate(8px, -8px) rotate(-10deg)`,
              boxShadow: '0 2px 4px rgba(180, 83, 9, 0.15)',
            }}
            initial={{ scale: 0 }}
            animate={{ scale: bloomProgress >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: delay + 0.15 + i * 0.03 }}
          />
        ))}

        {/* Layer 3 - Inner Rose Spiral Heart */}
        <motion.div
          className="relative w-7 h-7 rounded-full flex items-center justify-center z-10"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #FEF08A 0%, #F59E0B 70%, #D97706 100%)',
            boxShadow: 'inset 0 1px 3px rgba(180, 83, 9, 0.4)',
          }}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: bloomProgress >= 1 ? 1 : 0, rotate: 0 }}
          transition={{ duration: 0.6, delay: delay + 0.25 }}
        >
          <div className="w-3.5 h-3.5 rounded-full border-t-2 border-r-2 border-amber-600/70 rotate-45" />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Procedural 3D Alstroemeria / Delicate Lily Filler Flower
export const Alstroemeria3D: React.FC<{
  scale?: number;
  bloomProgress: number;
  delay?: number;
  className?: string;
}> = ({ scale = 1, bloomProgress, delay = 0, className = '' }) => {
  return (
    <motion.div
      style={{ transformStyle: 'preserve-3d' }}
      className={`relative flex items-center justify-center select-none pointer-events-none ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: bloomProgress >= 1 ? scale : 0,
        opacity: bloomProgress >= 1 ? 1 : 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay,
      }}
    >
      <div className="relative w-14 h-14 flex items-center justify-center">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={`alstro-${i}`}
            className="absolute w-4 h-8 rounded-full origin-bottom"
            style={{
              background: i % 2 === 0 
                ? 'linear-gradient(180deg, #FFFFFF 0%, #FEF9C3 60%, #FACC15 100%)'
                : 'linear-gradient(180deg, #FEF08A 0%, #FDE047 60%, #EAB308 100%)',
              transform: `rotate(${angle}deg) translateY(-10px)`,
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: bloomProgress >= 1 ? 1 : 0 }}
            transition={{ duration: 0.4, delay: delay + i * 0.03 }}
          >
            {/* Delicate floral freckles */}
            {i % 2 === 0 && (
              <div className="w-1 h-1 rounded-full bg-amber-700/50 mx-auto mt-2" />
            )}
          </motion.div>
        ))}
        {/* Center Stamens */}
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500 z-10 shadow-sm" />
      </div>
    </motion.div>
  );
};

// Lush Green Eucalyptus / Foliage Leaves
export const FoliageLeaf: React.FC<{
  x: number;
  y: number;
  rotation: number;
  scale?: number;
  bloomProgress: number;
  delay?: number;
}> = ({ x, y, rotation, scale = 1, bloomProgress, delay = 0 }) => {
  return (
    <motion.div
      className="absolute origin-bottom-center pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: `rotate(${rotation}deg) scale(${scale})`,
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: bloomProgress >= 1 ? scale : 0,
        opacity: bloomProgress >= 1 ? 1 : 0,
      }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      <div 
        className="w-5 h-12 rounded-[50%_50%_30%_30%] shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #15803D 0%, #166534 60%, #14532D 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
        }}
      >
        <div className="w-[1px] h-full mx-auto bg-emerald-300/40" />
      </div>
    </motion.div>
  );
};
