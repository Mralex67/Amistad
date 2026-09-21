import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Copy, Check, Edit3 } from 'lucide-react';

interface LoveLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoveLetterModal: React.FC<LoveLetterModalProps> = ({
  isOpen,
  onClose,
}) => {
  const defaultMessage = `Dicen que regalar flores amarillas es una de las tradiciones más bonitas para celebrar una amistad verdadera y sincera.

El amarillo representa la alegría, la luz que ilumina los días, la energía positiva y la gratitud por contar con alguien tan valioso en la vida.

Este ramo floreció especialmente para ti, Stefany, para recordarte lo mucho que se aprecia tu compañía, tu sonrisa y tu forma de ser.

Que tu camino siempre esté colmado de momentos felices, éxitos y bendiciones. ¡Gracias por tu valiosa amistad! 💛🌻`;

  const [message, setMessage] = useState(defaultMessage);
  const [isEditing, setIsEditing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-amber-950/40 backdrop-blur-sm">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer"
          />

          {/* Letter parchment paper */}
          <motion.div
            id="carta-modal-container"
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="relative w-full max-w-lg bg-[#FAF6EE] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#E7D7BD] z-10 overflow-hidden"
            style={{
              boxShadow: '0 25px 50px -12px rgba(180, 83, 9, 0.25), 0 0 0 1px rgba(251, 191, 36, 0.2)'
            }}
          >
            {/* Vintage texture */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#D97706 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Sunflower watermark */}
            <div className="absolute top-4 left-4 text-amber-400/30 text-2xl select-none pointer-events-none">
              🌻
            </div>
            <div className="absolute top-4 right-12 text-amber-400/30 text-2xl select-none pointer-events-none">
              ✦
            </div>

            {/* Close Button */}
            <button
              id="close-carta-btn"
              onClick={onClose}
              aria-label="Cerrar carta"
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-amber-100 hover:bg-amber-200 active:scale-95 text-amber-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Letter Header: "Carta 🌻" */}
            <div className="text-center mb-5 pb-3 border-b border-amber-200/80">
              <span className="text-xs uppercase font-sans font-bold tracking-widest text-amber-700 flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Amistad
              </span>
              <h2 className="text-3xl font-display font-bold text-amber-950 mt-1">
                Carta 🌻
              </h2>
              <p className="text-xs text-amber-800/80 mt-0.5">Para: Stefany</p>
            </div>

            {/* Letter Body Content */}
            <div className="relative my-4">
              {isEditing ? (
                <div className="space-y-2">
                  <textarea
                    id="edit-carta-textarea"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={8}
                    className="w-full p-4 rounded-xl border border-amber-300 bg-white/80 text-amber-950 font-serif text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-950 font-medium text-xs shadow-sm cursor-pointer"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-[#3E2B15] font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line tracking-wide">
                  {message}
                </div>
              )}
            </div>

            {/* Footer Signature: "Amistad" */}
            <div className="mt-6 pt-4 border-t border-amber-200/60 flex items-center justify-between text-xs sm:text-sm text-amber-800">
              <div className="flex items-center gap-1.5">
                <span className="text-base">🌻</span>
                <span className="font-handwriting text-2xl text-amber-900 font-bold">Amistad sincera</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="edit-carta-toggle"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100/80 hover:bg-amber-200/90 text-amber-900 text-xs transition-colors cursor-pointer"
                  title="Editar carta"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{isEditing ? 'Listo' : 'Editar'}</span>
                </button>

                <button
                  id="copy-carta-btn"
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-100/80 hover:bg-amber-200/90 text-amber-900 text-xs transition-colors cursor-pointer"
                  title="Copiar texto"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copied ? 'Copiado' : 'Copiar'}</span>
                </button>
              </div>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
