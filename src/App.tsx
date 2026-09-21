/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Sparkles, Music, Play, Pause } from 'lucide-react';
import { PetalBackground } from './components/PetalBackground';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { BloomingBouquet } from './components/BloomingBouquet';
import { LoveLetterModal } from './components/LoveLetterModal';

export default function App() {
  const [hasOpened, setHasOpened] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [bouquetKey, setBouquetKey] = useState(0);
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Triggered when clicking "Stefany 🫂"
  const handleOpenSurprise = () => {
    setHasOpened(true);
    
    // Play music immediately on this user click gesture
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.muted = false;
      audioRef.current.volume = 0.85;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setAudioError(false);
          })
          .catch((err) => {
            console.log('Autoplay policy caught:', err);
            setAudioError(true);
          });
      }
    }
  };

  const handleTogglePlay = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setAudioError(false);
      }).catch((err) => {
        console.error('Play error:', err);
      });
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    audioRef.current.muted = !audioRef.current.muted;
    setIsMuted(audioRef.current.muted);
  };

  const handleReplay = () => {
    setBouquetKey((k) => k + 1);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-[#FAF7F2] text-[#2C241E] select-none">
      
      {/* HTML5 Audio Element explicitly serving the official MP3 */}
      <audio
        ref={audioRef}
        id="flores-amarillas-audio"
        src={`${import.meta.env.BASE_URL}audio/flores_amarillas.mp3`}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Falling Yellow Petals & Floating Golden Sparkles */}
      <PetalBackground />

      {/* Top Navigation Bar with Audio Player */}
      <header className="relative z-30 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl filter drop-shadow">🌻</span>
          <div>
            <span className="font-display font-bold text-lg sm:text-xl text-amber-950 tracking-tight block leading-tight">
              Flores Amarillas
            </span>
            <span className="text-[11px] font-sans text-amber-700/80 tracking-wider uppercase font-semibold">
              Especial de Amistad
            </span>
          </div>
        </div>

        {/* Flores Amarillas Music Player Bar */}
        <div className="flex items-center gap-2">
          <button
            id="music-play-btn"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pausar Flores Amarillas' : 'Reproducir Flores Amarillas'}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border shadow-md backdrop-blur-md transition-all text-xs font-semibold cursor-pointer ${
              isPlaying
                ? 'bg-amber-400 text-amber-950 border-amber-500 shadow-amber-400/30'
                : 'bg-white/95 text-amber-900 border-amber-300 hover:bg-amber-50'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
                {/* Animated sound wave bars */}
                <div className="flex items-center gap-0.5 h-3.5">
                  <span className="w-1 bg-amber-950 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1 bg-amber-900 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1 bg-amber-950 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="font-bold hidden sm:inline">Sonando: Flores Amarillas</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-700 fill-amber-700" />
                <span className="font-medium">Música: Flores Amarillas</span>
              </>
            )}
          </button>

          {/* Mute / Unmute Button */}
          {isPlaying && (
            <button
              id="music-mute-btn"
              onClick={handleToggleMute}
              className="p-2 rounded-full bg-white/80 hover:bg-white text-amber-800 border border-amber-200 shadow-sm cursor-pointer"
              title={isMuted ? 'Activar sonido' : 'Silenciar'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-600" /> : <Volume2 className="w-4 h-4 text-amber-700" />}
            </button>
          )}
        </div>
      </header>

      {/* Banner if audio needed a manual start */}
      {audioError && !isPlaying && hasOpened && (
        <div className="relative z-30 mx-auto max-w-sm px-4 py-2 mb-2 bg-amber-100 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-center justify-between shadow-sm animate-bounce">
          <span className="flex items-center gap-1.5 font-medium">
            <Music className="w-4 h-4 text-amber-600" />
            Toca el botón arriba para escuchar la música 🎵
          </span>
          <button
            onClick={handleTogglePlay}
            className="px-2.5 py-1 bg-amber-500 text-amber-950 rounded-md font-bold text-[11px] cursor-pointer"
          >
            Reproducir
          </button>
        </div>
      )}

      {/* Main Interactive Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-3 py-2 sm:py-4">
        
        {/* VIEW 1: Initial Screen with the specific button "Stefany 🫂" */}
        <AnimatePresence mode="wait">
          {!hasOpened ? (
            <motion.div
              key="initial-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center justify-center text-center max-w-md w-full px-4"
            >
              {/* Decorative envelope icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 flex items-center justify-center shadow-xl shadow-amber-300/40 border-2 border-white mb-6 relative group"
              >
                <span className="text-4xl filter drop-shadow">💌</span>
                <span className="absolute -top-1 -right-1 text-sm animate-ping">✨</span>
              </motion.div>

              <h1 className="text-3xl sm:text-4xl font-display font-bold text-amber-950 mb-2 leading-tight">
                Hay un detalle especial para ti
              </h1>

              <p className="text-amber-800/80 text-sm sm:text-base max-w-xs mb-8 leading-relaxed">
                Toca el botón para abrir la sorpresa que florecerá en 3D especialmente para ti.
              </p>

              {/* ======================================================= */}
              {/* THE EXACT BUTTON REQUESTED: "Stefany 🫂" */}
              {/* ======================================================= */}
              <motion.button
                id="stefany-open-btn"
                onClick={handleOpenSurprise}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-amber-950 font-bold text-xl sm:text-2xl shadow-xl shadow-amber-400/40 border-2 border-yellow-200 cursor-pointer overflow-hidden animate-pulse-warm transition-transform"
              >
                {/* Shimmer light effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                
                <span className="relative z-10 flex items-center gap-2.5 drop-shadow-sm font-sans">
                  <span>Stefany</span>
                  <span className="text-2xl filter drop-shadow">🫂</span>
                </span>
              </motion.button>

              <div className="mt-4 flex items-center gap-1.5 text-xs text-amber-700/70 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Haz clic para abrir tu sorpresa</span>
              </div>
            </motion.div>
          ) : (
            /* VIEW 2: Envelope unsealing and Yellow Bouquet Blooming in 3D piece by piece */
            <motion.div
              key="opened-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full flex flex-col items-center justify-center"
            >
              <OpeningEnvelope
                isOpen={hasOpened}
                onOpen={() => {}}
              >
                {/* Inside the letter: The 3D Yellow Flower Bouquet forming piece by piece */}
                <BloomingBouquet
                  key={bouquetKey}
                  onOpenLetter={() => setShowLetterModal(true)}
                  onReplay={handleReplay}
                />
              </OpeningEnvelope>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* Heartfelt Dedication Letter Modal ("Carta 🌻" and "Amistad") */}
      <LoveLetterModal
        isOpen={showLetterModal}
        onClose={() => setShowLetterModal(false)}
      />

      {/* Elegant Footer */}
      <footer className="relative z-20 w-full py-4 text-center text-xs text-amber-900/70 flex items-center justify-center gap-1.5 select-none">
        <span>🌻</span>
        <span className="font-medium">Flores amarillas de amistad para Stefany</span>
      </footer>
    </div>
  );
}
