// Text-to-speech utility functions
export class TTSService {
  private synthesis: SpeechSynthesis;
  private utterance: SpeechSynthesisUtterance | null = null;

  constructor() {
    this.synthesis = window.speechSynthesis;
  }

  speak(text: string, options: {
    pitch: number;
    rate: number;
    volume: number;
    voice?: SpeechSynthesisVoice;
  }): void {
    if (this.utterance) {
      this.synthesis.cancel();
    }

    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.pitch = options.pitch;
    this.utterance.rate = options.rate;
    this.utterance.volume = options.volume;
    
    if (options.voice) {
      this.utterance.voice = options.voice;
    }

    this.synthesis.speak(this.utterance);
  }

  pause(): void {
    this.synthesis.pause();
  }

  resume(): void {
    this.synthesis.resume();
  }

  stop(): void {
    this.synthesis.cancel();
  }

  getVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      const voices = this.synthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        this.synthesis.addEventListener('voiceschanged', () => {
          resolve(this.synthesis.getVoices());
        }, { once: true });
      }
    });
  }
}
