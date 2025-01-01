import { useState, useEffect } from 'react';
import { TTSService } from '../utils/tts';

export function useTTS() {
  const [tts] = useState(() => new TTSService());
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    tts.getVoices().then((availableVoices) => {
      setVoices(availableVoices);
      setIsLoading(false);
    });
  }, [tts]);

  return {
    tts,
    voices,
    isLoading
  };
}
