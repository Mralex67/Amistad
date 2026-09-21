import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { chimeManager } from '../utils/audio';
import { Sparkles, Mail, RefreshCw, Heart } from 'lucide-react';
import { FloristRoseHD, FloristSunflowerHD } from './FloralHDParts';
import { Alstroemeria3D, FoliageLeaf } from './Floral3DParts';
import masterBouquetImg from '../assets/images/yellow_bouquet_1790031828879.jpg';

interface BloomingBouquetProps {
  onOpenLetter: () => void;
  onReplay: () => void;
}

export const BloomingBouquet: React.FC<BloomingBouquetProps> = ({
  onOpenLetter,
  onReplay,
}) => {
  // Step-by-step progressive assembly stages (0 to 8)
  const [step, setStep] = useState<number>(0);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [floatingParticles, setFloatingParticles] = useState<{ id: number; x: number; y: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Progressive piece-by-piece assembly:
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // Step 1: Kraft paper wrap and stems rise (300ms)
    timers.push(setTimeout(() => { setStep(1); chimeManager.playChime(1.0); }, 300));

    // Step 2: Lush eucalyptus and green foliage branch out (900ms)
    timers.push(setTimeout(() => { setStep(2); chimeManager.playChime(1.1); }, 900));

    // Step 3: Top HD yellow roses bloom (1600ms)
    timers.push(setTimeout(() => { setStep(3); chimeManager.playChime(1.2); }, 1600));

    // Step 4: Mid yellow roses & alstroemerias bloom (2400ms)
    timers.push(setTimeout(() => { setStep(4); chimeManager.playChime(1.3); }, 2400));

    // Step 5: Grand central HD sunflower unfolds in spotlight (3200ms)
    timers.push(setTimeout(() => { setStep(5); chimeManager.playChime(1.4); }, 3200));

    // Step 6: Champagne silk ribbon ties around bouquet (4000ms)
    timers.push(setTimeout(() => { setStep(6); chimeManager.playChime(1.5); }, 4000));

    // Step 7: Master florist composition harmonization (4700ms)
    timers.push(setTimeout(() => { setStep(7); chimeManager.playChime(1.6); }, 4700));

    // Step 8: Centerpiece Tag "Stefany 🌻" with "Amistad" attaches + Confetti (5400ms)
    timers.push(setTimeout(() => {
      setStep(8);
      chimeManager.playChime(1.8);

      // Golden and yellow petal confetti burst
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#FACC15', '#FEF08A', '#F59E0B', '#FBBF24', '#FFFFFF'],
        scalar: 1.25,
      });

      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0.15, y: 0.6 },
          colors: ['#FACC15', '#F59E0B', '#FEF08A'],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 0.85, y: 0.6 },
          colors: ['#FACC15', '#F59E0B', '#FEF08A'],
        });
      }, 350);
    }, 5400));

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // 3D Parallax tilt calculation on mouse or touch
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleStageClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    chimeManager.playChime(1.3);

    const id = Date.now() + Math.random();
    setFloatingParticles((prev) => [...prev.slice(-6), { id, x, y }]);
    setTimeout(() => {
      setFloatingParticles((prev) => prev.filter((p) => p.id !== id));
    }, 1100);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-xl mx-auto py-1 select-none">
      
      {/* Title Subheader */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-center mb-2"
      >
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/90 text-amber-900 border border-amber-300/80 text-xs font-semibold tracking-wide shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Floreciendo para ti en 3D</span>
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-amber-950 mt-1 tracking-tight">
          Ramo de Flores Amarillas
        </h2>
      </motion.div>

      {/* 3D Perspective Stage Container */}
      <div 
        className="relative w-full max-w-[390px] sm:max-w-[440px] h-[520px] sm:h-[560px] flex items-center justify-center perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleStageClick}
        ref={containerRef}
      >
        {/* 3D Floral Chassis */}
        <motion.div
          id="bouquet-3d-stage"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          }}
          transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          className="relative w-full h-full flex flex-col items-center justify-end pb-3 cursor-pointer"
        >
          {/* Ambient Warm Golden Sunlight Background Behind Bouquet */}
          <div 
            className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full pointer-events-none opacity-60 blur-3xl"
            style={{
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.95) 0%, rgba(245, 158, 11, 0.35) 55%, transparent 75%)',
            }}
          />

          {/* ======================================================== */}
          {/* LAYER 1: BOTANICAL STEMS & BASE (Step 1) */}
          {/* ======================================================== */}
          <motion.div
            className="absolute bottom-16 w-36 h-64 pointer-events-none flex justify-center"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: step >= 1 ? 1 : 0,
              opacity: step >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: 'bottom center' }}
          >
            <div className="w-2 h-full bg-emerald-800 rounded-full mx-1 shadow-sm" />
            <div className="w-2 h-56 bg-emerald-700 rounded-full mx-0.5 -rotate-6 shadow-sm" />
            <div className="w-1.5 h-52 bg-emerald-800 rounded-full mx-1 rotate-8 shadow-sm" />
            <div className="w-2 h-60 bg-emerald-900 rounded-full mx-0.5 rotate-3 shadow-sm" />
          </motion.div>

          {/* ======================================================== */}
          {/* LAYER 2: KRAFT PAPER & CHARCOAL CONE WRAP (Step 1) */}
          {/* ======================================================== */}
          <motion.div
            id="wrapping-cone"
            className="absolute bottom-6 w-[300px] sm:w-[330px] h-[370px] pointer-events-none"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{
              scaleY: step >= 1 ? 1 : 0,
              opacity: step >= 1 ? 1 : 0,
            }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
          >
            {/* Charcoal Paper Inner Cone */}
            <div 
              className="absolute inset-x-6 bottom-4 top-2 rounded-t-3xl shadow-xl"
              style={{
                clipPath: 'polygon(15% 0%, 85% 0%, 65% 100%, 35% 100%)',
                background: 'linear-gradient(180deg, #1C1917 0%, #292524 50%, #0C0A09 100%)',
                boxShadow: 'inset 0 10px 20px rgba(0,0,0,0.6)',
              }}
            />

            {/* Rustic Kraft Paper Wrap */}
            <div 
              className="absolute inset-0 rounded-t-3xl shadow-2xl"
              style={{
                clipPath: 'polygon(0% 12%, 100% 0%, 72% 100%, 28% 100%)',
                background: 'linear-gradient(165deg, #D4B996 0%, #C4A47C 40%, #A6845B 100%)',
                borderTop: '2px solid #E5D5C0',
              }}
            />
          </motion.div>

          {/* ======================================================== */}
          {/* LAYER 3: BOTANICAL FOLIAGE & EUCALYPTUS (Step 2) */}
          {/* ======================================================== */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <FoliageLeaf x={22} y={20} rotation={-45} scale={1.25} bloomProgress={step >= 2 ? 1 : 0} delay={0.05} />
            <FoliageLeaf x={70} y={18} rotation={42} scale={1.3} bloomProgress={step >= 2 ? 1 : 0} delay={0.12} />
            <FoliageLeaf x={14} y={30} rotation={-60} scale={1.1} bloomProgress={step >= 2 ? 1 : 0} delay={0.2} />
            <FoliageLeaf x={78} y={28} rotation={58} scale={1.15} bloomProgress={step >= 2 ? 1 : 0} delay={0.25} />
          </div>

          {/* ======================================================== */}
          {/* LAYER 4: ALSTROEMERIA FILLER BLOSSOMS (Step 4) */}
          {/* ======================================================== */}
          <div className="absolute inset-0 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute left-[18%] top-[30%]">
              <Alstroemeria3D scale={0.95} bloomProgress={step >= 4 ? 1 : 0} delay={0.05} />
            </div>
            <div className="absolute right-[20%] top-[28%]">
              <Alstroemeria3D scale={1.05} bloomProgress={step >= 4 ? 1 : 0} delay={0.15} />
            </div>
          </div>

          {/* ======================================================== */}
          {/* LAYER 5: HIGH-DEFINITION FLORIST ROSES (Steps 3 & 4) */}
          {/* ======================================================== */}
          <div className="absolute inset-0" style={{ transformStyle: 'preserve-3d' }}>
            {/* Top Left HD Rose */}
            <div className="absolute left-[18%] top-[14%] z-10">
              <FloristRoseHD 
                scale={0.92}
                bloom={step >= 3} 
                delay={0.05}
                rotation={-12}
                onClick={() => chimeManager.playChime(1.2)} 
              />
            </div>

            {/* Top Right HD Rose */}
            <div className="absolute right-[18%] top-[13%] z-10">
              <FloristRoseHD 
                scale={0.95}
                bloom={step >= 3} 
                delay={0.2}
                rotation={15}
                onClick={() => chimeManager.playChime(1.3)} 
              />
            </div>

            {/* Mid Left HD Rose */}
            <div className="absolute left-[10%] top-[26%] z-12">
              <FloristRoseHD 
                scale={0.88}
                bloom={step >= 4} 
                delay={0.1}
                rotation={-20}
                onClick={() => chimeManager.playChime(1.1)} 
              />
            </div>

            {/* Mid Right HD Rose */}
            <div className="absolute right-[10%] top-[25%] z-12">
              <FloristRoseHD 
                scale={0.9}
                bloom={step >= 4} 
                delay={0.25}
                rotation={22}
                onClick={() => chimeManager.playChime(1.4)} 
              />
            </div>
          </div>

          {/* ======================================================== */}
          {/* LAYER 6: THE CENTRAL RADIANT HD SUNFLOWER (Step 5) */}
          {/* ======================================================== */}
          <div className="absolute left-1/2 top-[24%] -translate-x-1/2 z-20" style={{ transformStyle: 'preserve-3d' }}>
            <FloristSunflowerHD
              scale={1.05}
              bloom={step >= 5}
              delay={0.1}
              rotation={5}
              onClick={() => chimeManager.playChime(1.5)}
            />
          </div>

          {/* ======================================================== */}
          {/* LAYER 7: MASTER FLORIST HARMONIZATION (Step 7) */}
          {/* Blends the arrangement into an exquisite unified florist masterpiece */}
          {/* ======================================================== */}
          <AnimatePresence>
            {step >= 7 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.0, ease: 'easeOut' }}
                className="absolute inset-x-3 top-8 bottom-4 z-22 rounded-2xl overflow-hidden pointer-events-none shadow-2xl"
              >
                <img
                  src={masterBouquetImg}
                  alt="Ramo floral completo de flores amarillas"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center rounded-2xl"
                />
                {/* Soft natural lighting gradient */}
                <div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, transparent 60%, rgba(0,0,0,0.2) 100%)',
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ======================================================== */}
          {/* LAYER 8: SILK CHAMPAGNE RIBBON & BOW (Step 6) */}
          {/* ======================================================== */}
          <motion.div
            id="ribbon-bow-silk"
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-28 flex flex-col items-center pointer-events-none"
            initial={{ scale: 0, rotate: -20, opacity: 0 }}
            animate={{
              scale: step >= 6 ? 1 : 0,
              rotate: step >= 6 ? 0 : -20,
              opacity: step >= 6 ? 1 : 0,
            }}
            transition={{ type: 'spring', stiffness: 280, damping: 18 }}
          >
            {/* Silk Bow Loop */}
            <div className="relative flex items-center justify-center">
              <div 
                className="w-9 h-9 rounded-full border-4 border-[#FBBF24] shadow-md -rotate-25 -mr-1"
                style={{
                  background: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 100%)',
                  boxShadow: '0 4px 10px rgba(180, 83, 9, 0.3)',
                }}
              />
              <div 
                className="w-5 h-5 rounded-full z-10 shadow-lg"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #FEF08A 0%, #D97706 100%)',
                  border: '1px solid #FDE047',
                }}
              />
              <div 
                className="w-9 h-9 rounded-full border-4 border-[#FBBF24] shadow-md rotate-25 -ml-1"
                style={{
                  background: 'linear-gradient(225deg, #FEF08A 0%, #F59E0B 100%)',
                  boxShadow: '0 4px 10px rgba(180, 83, 9, 0.3)',
                }}
              />
            </div>
            {/* Ribbon Tails */}
            <div className="flex gap-2 -mt-1">
              <div className="w-3.5 h-11 rounded-b-md bg-gradient-to-b from-[#F59E0B] to-[#D97706] -rotate-12 shadow-sm" />
              <div className="w-3.5 h-12 rounded-b-md bg-gradient-to-b from-[#F59E0B] to-[#B45309] rotate-12 shadow-sm" />
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* LAYER 9: MANDATED CENTER LABEL: "Stefany 🌻" with "Amistad" (Step 8) */}
          {/* ================================================================= */}
          <motion.div
            id="stefany-center-tag"
            initial={{ scale: 0, rotate: -15, opacity: 0, y: -40 }}
            animate={{
              scale: step >= 8 ? 1 : 0,
              rotate: step >= 8 ? -1.5 : -15,
              opacity: step >= 8 ? 1 : 0,
              y: step >= 8 ? 0 : -40,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 16,
            }}
            className="absolute bottom-28 left-1/2 -translate-x-1/2 z-35 w-[210px] sm:w-[240px] cursor-pointer group"
            onClick={(e) => {
              e.stopPropagation();
              onOpenLetter();
            }}
          >
            {/* Elegant Florist Tag Plaque */}
            <div className="relative bg-[#FFFDF7] rounded-xl px-4 py-2.5 shadow-2xl border-2 border-amber-300 transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-0">
              
              {/* Metallic Eyelet Pin at Top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 border border-amber-700 shadow flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-950" />
              </div>

              {/* Tag Content with "Amistad" as explicitly instructed */}
              <div className="border border-dashed border-amber-400/80 rounded-lg p-1.5 flex flex-col items-center justify-center text-center bg-amber-50/50">
                <span className="text-[10px] uppercase font-sans font-extrabold tracking-widest text-amber-700">
                  Amistad
                </span>
                
                {/* The Exact Label Requested */}
                <h3 className="text-xl sm:text-2xl font-serif font-extrabold text-amber-950 flex items-center justify-center gap-1.5 mt-0.5 tracking-tight drop-shadow-sm">
                  <span>Stefany</span>
                  <span className="text-xl">🌻</span>
                </h3>

                <span className="text-[10px] text-amber-800/80 font-medium mt-0.5">
                  Toca para abrir carta
                </span>
              </div>

              {/* Ribbon Bow Accent on Tag */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-amber-500 text-xs">
                🎀
              </div>
            </div>
          </motion.div>

          {/* Interactive Tap Particles */}
          {floatingParticles.map((p) => (
            <motion.div
              key={p.id}
              initial={{ scale: 0.4, opacity: 1, y: 0 }}
              animate={{ scale: 1.6, opacity: 0, y: -45 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="absolute pointer-events-none z-40 text-amber-400 font-bold"
              style={{ left: p.x, top: p.y }}
            >
              <span className="text-2xl drop-shadow-lg">💛</span>
            </motion.div>
          ))}

        </motion.div>
      </div>

      {/* Action Buttons Below Bouquet */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: step >= 8 ? 1 : 0, y: step >= 8 ? 0 : 15 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap items-center justify-center gap-3 mt-3 z-30 w-full"
      >
        {/* Specific instruction: "tampoco pongas , dedicatoria pon Carta 🌻" */}
        <button
          id="open-carta-btn"
          onClick={onOpenLetter}
          className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 hover:brightness-105 active:scale-95 text-amber-950 font-bold shadow-lg shadow-amber-500/30 border-2 border-yellow-200 transition-all cursor-pointer text-sm"
        >
          <Mail className="w-4 h-4 text-amber-950" />
          <span>Carta 🌻</span>
        </button>

        {/* Replay Bloom Animation */}
        <button
          id="replay-bloom-btn"
          onClick={onReplay}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/90 hover:bg-white active:scale-95 text-amber-900 font-semibold shadow-md border border-amber-200 transition-all cursor-pointer text-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-700" />
          <span>Volver a florecer ↺</span>
        </button>
      </motion.div>

    </div>
  );
};
