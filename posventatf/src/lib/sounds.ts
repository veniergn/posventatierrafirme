class SoundManager {
  private audioCtx: AudioContext | null = null;
  private unlocked = false;

  private init() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  public unlock() {
    if (this.unlocked) return;
    const ctx = this.init();
    // Play silent buffer to unlock audio engine on iOS
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    this.unlocked = true;
  }

  // 1. Sonido al tocar el logo de ingreso (Click futurista/suave)
  public playLoginClick() {
    try {
      this.unlock();
      const ctx = this.init();
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.8, ctx.currentTime + 0.02); // 80% volume
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  // 2. Sonido espacial/universo para transición
  public playTransitionSpace() {
    try {
      this.unlock();
      const ctx = this.init();
      
      // Creamos un acorde "espacial" y misterioso
      const freqs = [220, 277.18, 329.63, 440]; // A3, C#4, E4, A4 (Acorde A mayor etéreo)
      
      freqs.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'sine';
        
        // Efecto de barrido (Glissando suave)
        osc.frequency.setValueAtTime(freq * 0.8, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 2.5);

        // Envolvente de volumen (Sube lento, baja lento)
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(1.0 / freqs.length, ctx.currentTime + 0.5 + (index * 0.2)); // 100% total volume
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3);
      });
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  // 3. Sonido cuando se guarda algo (Campanilla de éxito)
  public playSaveSuccess() {
    try {
      this.unlock();
      const ctx = this.init();
      
      // Dos notas rápidas (Quinta perfecta: C6 -> G6)
      const playNote = (freq: number, startTime: number) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.7, startTime + 0.05); // 70% volume
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);

        osc.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      };

      playNote(1046.50, ctx.currentTime);       // C6
      playNote(1567.98, ctx.currentTime + 0.15); // G6
    } catch (e) {
      console.error("Audio error", e);
    }
  }
}

export const sounds = new SoundManager();
