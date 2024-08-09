import { useRef, useReducer, useCallback } from 'react';

// * reducers
const reducer = (audioState: AudioState, action: AudioAction): AudioState => {
  if (typeof action === 'string') {
    switch (action) {
      case 'play':
        return { ...audioState, playing: true };
      case 'pause':
        return { ...audioState, playing: false };
      case 'play/pause':
        return { ...audioState, playing: !audioState.playing };
      case 'loop':
        return { ...audioState, loop: !audioState.loop };
      case 'muted':
        return { ...audioState, muted: !audioState.muted };
    }
  }

  const { type, payload } = action;

  switch (type) {
    case 'loading':
      return { ...audioState, loading: payload };
    case 'volume':
      return { ...audioState, volume: Math.trunc(payload * 100) };
    case 'duration':
      return { ...audioState, duration: payload, timeLeft: payload };
    case 'time':
      return { ...audioState, currentTime: payload, timeLeft: audioState.duration - payload };
    case 'playbackRate':
      return { ...audioState, playbackRate: payload };
  }
};

// * data
const DEFAULT_AUDIO_STATE: AudioState = {
  playing: false,
  loading: false,
  duration: 0,
  timeLeft: 0,
  currentTime: 0,
  muted: false,
  loop: false,
  volume: 100,
  playbackRate: 1,
};

// * types
type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;

type AudioProps = { children: (audioContext: AudioContext) => React.ReactNode };

type AudioState = {
  playing: boolean;
  loading: boolean;
  duration: number;
  timeLeft: number;
  currentTime: number;
  muted: boolean;
  loop: boolean;
  volume: number;
  playbackRate: number;
};

type AudioContext = AudioState & {
  audioRef: React.RefObject<HTMLAudioElement>;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleMuted: () => void;
  setVolume: (newVolume: number) => void;
  forwardTrack: (step?: number) => void;
  rewindTrack: (step?: number) => void;
  setPlaybackRate: (newPlaybackRate: number) => void;
};

type AudioAction =
  | 'play'
  | 'pause'
  | 'play/pause'
  | 'muted'
  | 'loop'
  | { type: 'loading'; payload: boolean }
  | {
      type: 'time' | 'duration' | 'volume' | 'playbackRate';
      payload: number;
    };

const Audio = ({ children }: AudioProps) => {
  const [audioState, dispatch] = useReducer(reducer, DEFAULT_AUDIO_STATE);
  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdateHandler = (e: AudioEvent) => {
    const audio = e.currentTarget;
    dispatch({ type: 'time', payload: audio.currentTime });
  };

  const volumeChangeHandler = (e: AudioEvent) => {
    const audio = e.currentTarget;

    dispatch({ type: 'volume', payload: audio.volume });
  };

  const metadataLoadHandler = (e: AudioEvent) => {
    const audio = e.currentTarget;

    dispatch({ type: 'duration', payload: audio.duration });
    dispatch({ type: 'volume', payload: audio.volume });
  };

  const play = useCallback(() => audioRef.current?.play(), []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.paused ? audio.play() : audio.pause();
  }, []);

  const toggleMuted = useCallback(() => dispatch('muted'), []);

  const toggleLoop = useCallback(() => dispatch('loop'), []);

  const setVolume = useCallback((newVolume: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    newVolume = Math.min(Math.max(0, newVolume), 100);
    audio.volume = newVolume / 100;
  }, []);

  const setPlaybackRate = useCallback((newPlaybackRate: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = newPlaybackRate;
    dispatch({ type: 'playbackRate', payload: newPlaybackRate });
  }, []);

  const forwardTrack = useCallback((step: number = 5) => {
    const audio = audioRef.current;
    if (!audio) return;

    step = Math.abs(step);
    audio.currentTime = Math.min(audio.currentTime + step, audio.duration);
  }, []);

  const rewindTrack = useCallback((step: number = 5) => {
    const audio = audioRef.current;
    if (!audio) return;

    step = Math.abs(step);
    audio.currentTime = Math.max(0, audio.currentTime - step);
  }, []);

  const audioContext: AudioContext = {
    ...audioState,
    play,
    pause,
    togglePlay,
    toggleMuted,
    toggleLoop,
    setVolume,
    setPlaybackRate,
    forwardTrack,
    rewindTrack,
    audioRef,
  };

  /**
   * Is the ref to the audio element necessary?
   */

  return (
    <>
      <audio
        controls
        ref={audioRef}
        loop={audioState.loop}
        muted={audioState.muted}
        onPlay={dispatch.bind(null, 'play')}
        onPause={dispatch.bind(null, 'pause')}
        onTimeUpdate={timeUpdateHandler}
        onVolumeChange={volumeChangeHandler}
        onLoadedMetadata={metadataLoadHandler}
        onCanPlay={dispatch.bind(null, { type: 'loading', payload: false })}
        onWaiting={dispatch.bind(null, { type: 'loading', payload: true })}
        onLoadStart={dispatch.bind(null, { type: 'loading', payload: true })}
      >
        <source src='/1.mp3' />
      </audio>
      {children(audioContext)}
    </>
  );
};

export default Audio;
