import React from 'react';
import { motion } from 'motion/react';

interface OpeningEnvelopeProps {
  isOpen: boolean;
  onOpen: () => void;
  children: React.ReactNode;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  isOpen,
  onOpen,
  children,
}) => {
  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center min-h-[580px] p-2">
      {/* Outer Envelope Wrapper */}
      <div className="relative w-full flex flex-col items-center">
        
        {/* The Card / Content sliding out */}
        <motion.div
          id="envelope-content-slide"
          initial={false}
          animate={{
            y: isOpen ? -80 : 40,
            scale: isOpen ? 1 : 0.85,
            opacity: isOpen ? 1 : 0,
            zIndex: isOpen ? 30 : 5,
          }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: isOpen ? 0.6 : 0,
          }}
          className="w-full relative"
        >
          {children}
        </motion.div>

        {/* Envelope Body Graphics (only visible or collapsed smoothly when bouquet expands) */}
        <motion.div
          id="envelope-container"
          animate={{
            opacity: isOpen ? 0.15 : 1,
            scale: isOpen ? 0.92 : 1,
            y: isOpen ? 140 : 0,
          }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="relative w-[340px] sm:w-[420px] h-[240px] sm:h-[280px] select-none perspective-1000 z-10 -mt-20"
        >
          {/* Back of Envelope */}
          <div className="absolute inset-0 bg-[#E8DEC8] rounded-xl shadow-2xl border border-[#D5C7AA] overflow-hidden">
            {/* Inner lining with subtle golden damask / sunflower pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)',
                backgroundSize: '16px 16px',
              }}
            />
          </div>

          {/* Envelope Left & Right flaps */}
          <div 
            className="absolute inset-0 pointer-events-none z-15"
            style={{
              clipPath: 'polygon(0% 0%, 50% 55%, 0% 100%)',
              background: 'linear-gradient(135deg, #DFD1B8 0%, #CEBEA1 100%)',
            }}
          />
          <div 
            className="absolute inset-0 pointer-events-none z-15"
            style={{
              clipPath: 'polygon(100% 0%, 50% 55%, 100% 100%)',
              background: 'linear-gradient(225deg, #DFD1B8 0%, #CBB99B 100%)',
            }}
          />

          {/* Envelope Bottom flap */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              clipPath: 'polygon(0% 100%, 50% 48%, 100% 100%)',
              background: 'linear-gradient(0deg, #E6D7BD 0%, #D8C7A8 100%)',
              boxShadow: '0 -4px 15px rgba(0,0,0,0.06)',
            }}
          />

          {/* Envelope Top Flap (folds open in 3D) */}
          <motion.div
            id="envelope-top-flap"
            initial={false}
            animate={{
              rotateX: isOpen ? 180 : 0,
              zIndex: isOpen ? 2 : 25,
            }}
            transition={{
              duration: 0.9,
              ease: [0.4, 0, 0.2, 1],
            }}
            style={{
              transformOrigin: 'top center',
              clipPath: 'polygon(0% 0%, 100% 0%, 50% 55%)',
              background: 'linear-gradient(180deg, #EFE2CB 0%, #DECDB0 100%)',
            }}
            className="absolute inset-0 transform-style-3d shadow-md"
          >
            {/* Wax Seal placed on top flap when closed */}
            {!isOpen && (
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center">
                <button
                  id="wax-seal-btn"
                  onClick={onOpen}
                  aria-label="Abrir carta para Stefany"
                  className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 shadow-lg flex items-center justify-center text-white border-2 border-amber-300 transform transition-transform hover:scale-110 active:scale-95 group cursor-pointer"
                >
                  <span className="text-2xl filter drop-shadow group-hover:rotate-12 transition-transform">🌻</span>
                  <div className="absolute inset-0 rounded-full border border-amber-200/50 pointer-events-none" />
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
