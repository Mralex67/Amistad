import React from 'react';
import { motion } from 'motion/react';
import roseImg from '../assets/images/yellow_rose_hd_1790032772141.jpg';
import sunflowerImg from '../assets/images/yellow_sunflower_hd_1790032762231.jpg';

// Professional Florist HD Yellow Rose Component
export const FloristRoseHD: React.FC<{
  scale?: number;
  bloom: boolean;
  delay?: number;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}> = ({ scale = 1, bloom, delay = 0, rotation = 0, className = '', onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      initial={{ scale: 0, opacity: 0, rotate: rotation - 25 }}
      animate={{
        scale: bloom ? scale : 0,
        opacity: bloom ? 1 : 0,
        rotate: bloom ? rotation : rotation - 25,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        delay,
      }}
      whileHover={{ scale: scale * 1.08 }}
      whileTap={{ scale: scale * 0.95 }}
    >
      {/* Soft warm backlight glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-60 blur-md pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(254, 240, 138, 0.7) 0%, rgba(245, 158, 11, 0.2) 65%, transparent 80%)'
        }}
      />

      {/* High-definition velvety yellow rose with natural organic blend */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-xl border border-amber-200/50">
        <img
          src={roseImg}
          alt="Rosa amarilla de floristería"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110 group-hover:scale-120 transition-transform duration-500"
        />
        {/* Soft edge vignette to integrate seamlessly */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 14px rgba(180, 83, 9, 0.35)',
          }}
        />
      </div>

      {/* Little sparkle on bloom */}
      <motion.div
        className="absolute -top-1 -right-1 text-amber-300 text-sm pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: bloom ? [0, 1.3, 1] : 0, opacity: bloom ? 1 : 0 }}
        transition={{ delay: delay + 0.3, duration: 0.5 }}
      >
        ✨
      </motion.div>
    </motion.div>
  );
};

// Professional Florist HD Radiant Sunflower Component
export const FloristSunflowerHD: React.FC<{
  scale?: number;
  bloom: boolean;
  delay?: number;
  rotation?: number;
  className?: string;
  onClick?: () => void;
}> = ({ scale = 1, bloom, delay = 0, rotation = 0, className = '', onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative flex items-center justify-center select-none cursor-pointer group ${className}`}
      initial={{ scale: 0, opacity: 0, rotate: rotation - 40 }}
      animate={{
        scale: bloom ? scale : 0,
        opacity: bloom ? 1 : 0,
        rotate: bloom ? rotation : rotation - 40,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 17,
        delay,
      }}
      whileHover={{ scale: scale * 1.07 }}
      whileTap={{ scale: scale * 0.96 }}
    >
      {/* Radiant Golden Corona Glow */}
      <div 
        className="absolute -inset-4 rounded-full opacity-70 blur-xl pointer-events-none animate-pulse"
        style={{
          background: 'radial-gradient(circle, rgba(253, 224, 71, 0.8) 0%, rgba(245, 158, 11, 0.3) 60%, transparent 80%)',
          animationDuration: '3.5s',
        }}
      />

      {/* High-definition radiant sunflower with organic florist blend */}
      <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden shadow-2xl border-2 border-amber-300/60 z-10">
        <img
          src={sunflowerImg}
          alt="Girasol radiante de floristería"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform scale-110 group-hover:scale-120 transition-transform duration-500"
        />
        {/* Soft edge depth vignette */}
        <div 
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 20px rgba(120, 53, 15, 0.4)',
          }}
        />
      </div>

      {/* Golden halo rings */}
      <motion.div
        className="absolute inset-0 rounded-full border border-amber-400/40 pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  );
};
