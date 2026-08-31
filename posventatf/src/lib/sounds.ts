class SoundManager {
  private loginAudio: HTMLAudioElement | null = null;
  private transitionAudio: HTMLAudioElement | null = null;
  private successAudio: HTMLAudioElement | null = null;

  public playLoginClick() {
    try {
      if (!this.loginAudio) this.loginAudio = new Audio('/sounds/login.wav');
      this.loginAudio.currentTime = 0;
      this.loginAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  public playTransitionSpace() {
    try {
      if (!this.transitionAudio) this.transitionAudio = new Audio('/sounds/transition.wav');
      this.transitionAudio.currentTime = 0;
      this.transitionAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }

  public playSaveSuccess() {
    try {
      if (!this.successAudio) this.successAudio = new Audio('/sounds/success.wav');
      this.successAudio.currentTime = 0;
      this.successAudio.play().catch(e => console.error("Audio play error", e));
    } catch (e) {
      console.error("Audio error", e);
    }
  }
}

export const sounds = new SoundManager();
