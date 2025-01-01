import React, { useState, useCallback } from 'react';
import { Play, Pause, Download, StopCircle } from 'lucide-react';
import { TextEditor } from './components/TextEditor';
import { VoiceControls } from './components/VoiceControls';
import { VoiceSelector } from './components/VoiceSelector';
import { useTTS } from './hooks/useTTS';

function App() {
  const { tts, voices, isLoading } = useTTS();
  const [text, setText] = useState('');
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [pitch, setPitch] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = useCallback(() => {
    if (isPlaying) {
      tts.pause();
      setIsPlaying(false);
    } else {
      tts.speak(text, {
        pitch,
        rate: speed,
        volume,
        voice: selectedVoice || undefined
      });
      setIsPlaying(true);
    }
  }, [isPlaying, text, pitch, speed, volume, selectedVoice, tts]);

  const handleStop = useCallback(() => {
    tts.stop();
    setIsPlaying(false);
  }, [tts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Voice Synthesizer</h1>
          <p className="text-lg text-gray-600">Transform your text into natural-sounding speech</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <TextEditor text={text} onTextChange={setText} />
            <VoiceSelector 
              voices={voices}
              selectedVoice={selectedVoice}
              onVoiceChange={setSelectedVoice}
              isLoading={isLoading}
            />
          </div>

          <div className="space-y-8">
            <VoiceControls
              pitch={pitch}
              speed={speed}
              volume={volume}
              onPitchChange={setPitch}
              onSpeedChange={setSpeed}
              onVolumeChange={setVolume}
            />

            <div className="flex gap-4">
              <button
                onClick={handlePlay}
                disabled={!text}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    Play
                  </>
                )}
              </button>
              <button
                onClick={handleStop}
                disabled={!isPlaying}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <StopCircle className="w-5 h-5" />
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
