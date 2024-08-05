import { useRef, useReducer } from 'react';

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
    }
  }

  const { type, payload } = action;

  switch (type) {
    case 'duration':
      return { ...audioState, duration: payload, timeLeft: payload };
    case 'time':
      return { ...audioState, currentTime: payload, timeLeft: audioState.duration - payload };
  }

  return audioState;
};

// * data
const DEFAULT_AUDIO_STATE: AudioState = {
  playing: false,
  duration: 0,
  timeLeft: 0,
  currentTime: 0,
  loop: false,
};

// * types
type AudioEvent = React.SyntheticEvent<HTMLAudioElement, Event>;

type AudioProps = { children: (audioContext: AudioContext) => React.ReactNode };

type AudioState = {
  playing: boolean;
  duration: number;
  timeLeft: number;
  currentTime: number;
  loop: boolean;
};

type AudioContext = AudioState & {
  audioRef: React.RefObject<HTMLAudioElement>;
};

type AudioAction =
  | 'play'
  | 'pause'
  | 'play/pause'
  | 'loop'
  | {
      type: 'time' | 'duration';
      payload: number;
    };

const Audio = ({ children }: AudioProps) => {
  const [audioState, dispatch] = useReducer(reducer, DEFAULT_AUDIO_STATE);
  const audioRef = useRef<HTMLAudioElement>(null);

  const timeUpdateHandler = (e: AudioEvent) => {
    const audio = e.currentTarget;
    dispatch({ type: 'time', payload: audio.currentTime });
  };

  const metadataLoadHandler = (e: AudioEvent) => {
    const audio = e.currentTarget;
    dispatch({ type: 'duration', payload: audio.duration });
  };

  const audioContext = { ...audioState, audioRef };

  /**
   * Is the ref to the audio element necessary?
   */

  return (
    <>
      <audio
        controls
        ref={audioRef}
        loop={audioState.loop}
        onPlay={dispatch.bind(null, 'play')}
        onPause={dispatch.bind(null, 'pause')}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={metadataLoadHandler}
      >
        <source src='/1.mp3' />
      </audio>
      {children(audioContext)}
    </>
  );
};

export default Audio;
