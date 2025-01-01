import React from 'react';
import { Mic2 } from 'lucide-react';

interface VoiceSelectorProps {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  onVoiceChange: (voice: SpeechSynthesisVoice) => void;
  isLoading: boolean;
}

export function VoiceSelector({ voices, selectedVoice, onVoiceChange, isLoading }: VoiceSelectorProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Mic2 className="w-5 h-5 text-indigo-600 animate-pulse" />
          <h2 className="text-lg font-semibold text-gray-900">Loading voices...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Mic2 className="w-5 h-5 text-indigo-600" />
        <h2 className="text-lg font-semibold text-gray-900">Select Voice</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {voices.map((voice) => (
          <button
            key={voice.voiceURI}
            onClick={() => onVoiceChange(voice)}
            className={`flex items-center justify-between p-4 rounded-lg border ${
              selectedVoice?.voiceURI === voice.voiceURI
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/50'
            }`}
          >
            <div className="space-y-1">
              <p className="font-medium text-gray-900">{voice.name}</p>
              <p className="text-sm text-gray-500">{voice.lang}</p>
            </div>
            {selectedVoice?.voiceURI === voice.voiceURI && (
              <div className="w-3 h-3 bg-indigo-600 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
