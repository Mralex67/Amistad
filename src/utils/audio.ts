/**
 * Audio Chime Synthesizer for floral touches
 */

class ChimeAudio {
  private ctx: AudioContext | null = null;
  private isMuted = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playChime(freqMultiplier = 1) {
    try {
      this.initCtx();
      if (!this.ctx || this.isMuted) return;

      const baseNotes = [659.25, 783.99, 987.77, 1318.51]; // E5, G5, B5, E6
      const now = this.ctx.currentTime;

      baseNotes.forEach((note, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note * freqMultiplier, now + i * 0.05);

        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.09, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.6);
      });
    } catch {
      // AudioContext fallback
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const chimeManager = new ChimeAudio();
