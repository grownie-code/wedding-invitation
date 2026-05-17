import { create } from 'zustand';

interface AudioState {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    hasInteracted: boolean;
    play: () => void;
    pause: () => void;
    toggleMute: () => void;
    setVolume: (vol: number) => void;
    triggerInteraction: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
    isPlaying: false,
    isMuted: false,
    volume: 0.4,
    hasInteracted: false,

    play: () => set({ isPlaying: true }),
    pause: () => set({ isPlaying: false }),
    toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
    setVolume: (vol) => set({ volume: Math.max(0, Math.min(1, vol)) }),

    triggerInteraction: () => set({ hasInteracted: true, isPlaying: true }),
}));