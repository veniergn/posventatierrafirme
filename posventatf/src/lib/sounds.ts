class SoundManager {
  private loginAudio: HTMLAudioElement;
  private transitionAudio: HTMLAudioElement;
  private successAudio: HTMLAudioElement;

  constructor() {
    this.loginAudio = new Audio('/sounds/login.wav');
    this.transitionAudio = new Audio('/sounds/transition.wav');
    this.successAudio = new Audio('/sounds/success.wav');
    
    // Preload them to be ready
    this.loginAudio.load();
    this.transitionAudio.load();
    this.successAudio.load();
  }

  public playLoginClick() {
    try {
      this.loginAudio.currentTime = 0;
      this.loginAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  public playTransitionSpace() {
    try {
      this.transitionAudio.currentTime = 0;
      this.transitionAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  public playSaveSuccess() {
    try {
      this.successAudio.currentTime = 0;
      this.successAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }
}

export const sounds = new SoundManager();
