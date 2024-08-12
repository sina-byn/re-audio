import { useRef, useMemo, useEffect, useReducer, useCallback } from 'react';

// * utils
import { isNullish, generateShuffledArray } from '../utils';

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
      case 'muted':
        return { ...audioState, muted: !audioState.muted };
      case 'shuffle':
        return { ...audioState, shuffle: !audioState.shuffle };
    }
  }

  const { type, payload } = action;

  switch (type) {
    case 'track':
      return { ...audioState, trackIndex: payload };
    case 'loading':
      return { ...audioState, loading: payload };
    case 'repeat':
      return { ...audioState, repeat: payload };
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
  shuffle: true,
  repeat: 'playlist',
  volume: 100,
  playbackRate: 1,
  trackIndex: 0,
};

// * types
type RepeatMode = 'track' | 'playlist';

type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;

type AudioProps = {
  playlist: AudioTrack[];
  defaultMuted?: boolean;
  defaultRepeat?: RepeatMode;
  defaultShuffle?: boolean;
  defaultVolume?: number;
  defaultPlaybackRate?: number;
  defaultTrackIndex?: number;
  startMargin?: number | boolean;
  children: (audioContext: AudioContext) => React.ReactNode;
};

type AudioTrack = {
  id: string | number;
  src: string;
  type?: string;
  fallbacks?: Pick<AudioTrack, 'src' | 'type'>[];
} & Record<string, unknown>;

type AudioState = {
  playing: boolean;
  loading: boolean;
  duration: number;
  timeLeft: number;
  currentTime: number;
  muted: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  volume: number;
  playbackRate: number;
  trackIndex: number;
};

type AudioContext = AudioState & {
  audioRef: React.RefObject<HTMLAudioElement>;
  playlist: AudioTrack[];
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  toggleMuted: () => void;
  toggleShuffle: () => void;
  setVolume: (newVolume: number) => void;
  setRepeat: (repeat: RepeatMode) => void;
  setCurrentTime: (newCurrentTime: number) => void;
  forwardTrack: (step?: number) => void;
  rewindTrack: (step?: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaybackRate: (newPlaybackRate: number) => void;
};

type AudioAction =
  | 'play'
  | 'pause'
  | 'play/pause'
  | 'muted'
  | 'shuffle'
  | { type: 'loading'; payload: boolean }
  | { type: 'repeat'; payload: RepeatMode }
  | {
      type: 'track' | 'time' | 'duration' | 'volume' | 'playbackRate';
      payload: number;
    };

const Audio = ({
  playlist,
  defaultMuted,
  defaultShuffle,
  defaultVolume,
  defaultPlaybackRate,
  defaultRepeat = 'playlist',
  defaultTrackIndex = 0,
  startMargin = 5,
  children,
}: AudioProps) => {
  const [audioState, dispatch] = useReducer(reducer, {
    ...DEFAULT_AUDIO_STATE,
    muted: !!defaultMuted,
    repeat: defaultRepeat,
    shuffle: !!defaultShuffle,
    trackIndex: defaultTrackIndex % playlist.length,
  });

  const audioRef = useRef<HTMLAudioElement>(null);
  const track = playlist[audioState.trackIndex];
  const trackCount = playlist.length;

  // prettier-ignore
  const suhffledPlaylist = useMemo(() => generateShuffledArray(playlist.length), [playlist, audioState.shuffle]);
  // prettier-ignore
  const shuffledIndex = useMemo(() => suhffledPlaylist.indexOf(audioState.trackIndex), [suhffledPlaylist, audioState.trackIndex]);

  const endHandler = useCallback(() => {
    if (audioState.repeat === 'playlist') nextTrack();
  }, [playlist, audioState.shuffle, audioState.trackIndex]);

  const timeUpdateHandler = useCallback((e: AudioEvent) => {
    const audio = e.currentTarget;
    dispatch({ type: 'time', payload: audio.currentTime });
  }, []);

  const volumeChangeHandler = useCallback((e: AudioEvent) => {
    const audio = e.currentTarget;
    dispatch({ type: 'volume', payload: audio.volume });
  }, []);

  const metadataLoadHandler = useCallback((e: AudioEvent) => {
    const audio = e.currentTarget;

    dispatch({ type: 'duration', payload: audio.duration });
    dispatch({ type: 'volume', payload: audio.volume });
  }, []);

  const play = useCallback(() => audioRef.current?.play(), []);

  const pause = useCallback(() => audioRef.current?.pause(), []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.paused ? audio.play() : audio.pause();
  }, []);

  const toggleMuted = useCallback(() => dispatch('muted'), []);

  // prettier-ignore
  const setRepeat = useCallback((repeat: RepeatMode) => dispatch({ type: 'repeat', payload: repeat }), []);

  const toggleShuffle = useCallback(() => dispatch('shuffle'), []);

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

  const setCurrentTime = useCallback((newCurrentTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    newCurrentTime = Math.min(Math.max(0, newCurrentTime), audio.duration);
    audio.currentTime = newCurrentTime;
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

  const nextTrack = useCallback(() => {
    if (audioState.shuffle) {
      const newShuffledIndex = shuffledIndex === trackCount - 1 ? 0 : shuffledIndex + 1;
      dispatch({ type: 'track', payload: suhffledPlaylist[newShuffledIndex] });
      return;
    }

    const currIndex = audioState.trackIndex;
    const newTrackIndex = currIndex === trackCount - 1 ? 0 : currIndex + 1;

    dispatch({ type: 'track', payload: newTrackIndex });
  }, [playlist, audioState.shuffle, audioState.trackIndex]);

  const prevTrack = useCallback(() => {
    const audio = audioRef.current;
    const margin = typeof startMargin === 'boolean' ? 5 : startMargin;

    if (audio && startMargin !== false && audio.currentTime > margin) {
      audio.currentTime = 0;
      return;
    }

    if (audioState.shuffle) {
      const newShuffledIndex = shuffledIndex === 0 ? trackCount - 1 : shuffledIndex - 1;
      dispatch({ type: 'track', payload: suhffledPlaylist[newShuffledIndex] });
      return;
    }

    const currIndex = audioState.trackIndex;
    const newTrackIndex = currIndex === 0 ? trackCount - 1 : currIndex - 1;
    dispatch({ type: 'track', payload: newTrackIndex });
  }, [playlist, audioState.shuffle, audioState.trackIndex]);

  const audioContext: AudioContext = {
    ...audioState,
    play,
    pause,
    togglePlay,
    toggleMuted,
    toggleShuffle,
    setRepeat,
    setVolume,
    setCurrentTime,
    setPlaybackRate,
    forwardTrack,
    rewindTrack,
    nextTrack,
    prevTrack,
    playlist,
    audioRef,
  };

  useEffect(() => {
    if (!isNullish(defaultVolume)) setVolume(defaultVolume!);
    if (!isNullish(defaultPlaybackRate)) setPlaybackRate(defaultPlaybackRate!);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.play();
  }, [audioState.trackIndex]);

  return (
    <>
      <audio
        key={audioState.trackIndex}
        controls
        ref={audioRef}
        muted={audioState.muted}
        loop={audioState.repeat === 'track'}
        onEnded={endHandler}
        onPlay={dispatch.bind(null, 'play')}
        onPause={dispatch.bind(null, 'pause')}
        onTimeUpdate={timeUpdateHandler}
        onVolumeChange={volumeChangeHandler}
        onLoadedMetadata={metadataLoadHandler}
        onCanPlay={dispatch.bind(null, { type: 'loading', payload: false })}
        onWaiting={dispatch.bind(null, { type: 'loading', payload: true })}
        onLoadStart={dispatch.bind(null, { type: 'loading', payload: true })}
      >
        {track !== null && <source src={track.src} type={track.type} />}
        {track?.fallbacks &&
          track.fallbacks.map(fallback => (
            <source key={fallback.src} src={fallback.src} type={fallback.type} />
          ))}
      </audio>
      {children(audioContext)}
    </>
  );
};

export default Audio;
