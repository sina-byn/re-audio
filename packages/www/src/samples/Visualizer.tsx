import { useState, useEffect } from 'react';

// * assets
// @ts-ignore
import _1_mp3 from '@site/static/audio/1.mp3';
// @ts-ignore
import _2_mp3 from '@site/static/audio/2.mp3';
// @ts-ignore
import _3_mp3 from '@site/static/audio/3.mp3';

// * components
import CodeBlock from '../components/CodeBlock';
import { Audio, useVisualizer, formatTime } from '../components/ReAudio';

// * icons
import {
  IconVolume,
  IconVolume2,
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerSkipBackFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconPlayerSkipForwardFilled,
} from '@tabler/icons-react';

// * styles
import '../css/tailwind.css';

const code = `// AudioPlayer.tsx

import { Audio, useVisualizer, formatTime } from '@sina_byn/re-audio';

const Visualizer = () => {
  const analyserRef = useVisualizer(32);
  const [frame, setFrame] = useState<number[]>(analyserRef.current.getFrequencyData());

  useEffect(() => {
    let animationFrameId: number;

    const updateFrame = () => {
      setFrame(analyserRef.current.getFrequencyData());
      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className='flex items-end justify-center gap-x-1 h-28 overflow-x-hidden'>
      {frame.map((f, index) => (
        <div
          key={index}
          style={{ height: \`\${(f / 255) * 100}%\` }}
          className='w-1.5 min-h-2.5 bg-white/50 rounded-t-full'
        />
      ))}
    </div>
  );
};

const AudioPlayer = () => {
  return (
    <Audio
      playlist={[
        { id: 1, src: _1_mp3, name: 'for-her-chill' },
        { id: 2, src: _2_mp3, name: 'trap-type-beat-rap-instrumental-riff' },
        { id: 3, src: _3_mp3, name: 'whip-afro-dancehall' },
      ]}
    >
      {({
        loading,
        trackIndex,
        playlist,
        playing,
        togglePlay,
        duration,
        currentTime,
        volume,
        setVolume,
        prevTrack,
        nextTrack,
        rewindTrack,
        forwardTrack,
        setCurrentTime,
      }) => (
        <div>
          <div className='flex'>
            <div className='flex max-md:flex-col justify-between gap-4 w-full'>
              <div className='flex items-center gap-4'>
                <div className='size-[60px] bg-[#c4c4c4] rounded' />

                <div className='flex flex-col'>
                  <span className='capitalize'>
                    {/* @ts-ignore */}
                    {playlist[trackIndex].name.split(/-/).join(' ')}
                  </span>
                  <span>{formatTime(currentTime)}</span>
                </div>
              </div>

              <div className='flex items-center max-md:justify-center gap-x-4'>
                <button type='button' onClick={rewindTrack.bind(null, 10)}>
                  <IconPlayerSkipBackFilled />
                </button>

                <button type='button' onClick={prevTrack}>
                  <IconPlayerTrackPrevFilled />
                </button>

                <button type='button' onClick={togglePlay}>
                  {playing ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                </button>

                <button type='button' onClick={nextTrack}>
                  <IconPlayerTrackNextFilled />
                </button>

                <button type='button' onClick={forwardTrack.bind(null, 10)}>
                  <IconPlayerSkipForwardFilled />
                </button>
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <input
              type='range'
              min='0'
              max={duration}
              step='1'
              className='w-full'
              value={currentTime}
              onChange={e => setCurrentTime(+e.currentTarget.value)}
            />
          </div>

          <div className='flex items-center justify-between gap-x-4'>
            <div className='flex items-center gap-x-2 mt-4'>
              <IconVolume2 />

              <input
                type='range'
                min='0'
                max='100'
                className='w-full md:w-[150px]'
                value={volume}
                onChange={e => setVolume(+e.currentTarget.value)}
              />

              <IconVolume />
            </div>

            {loading && <span className='max-lg:text-sm mt-2'>loading...</span>}
          </div>

          <div className='mt-8'>
            <Visualizer />
          </div>
        </div>
      )}
    </Audio>
  );
};

export default AudioPlayer;
`;

const Visualizer = () => {
  const analyserRef = useVisualizer(32);
  const [frame, setFrame] = useState<number[]>(analyserRef.current.getFrequencyData());

  useEffect(() => {
    let animationFrameId: number;

    const updateFrame = () => {
      setFrame(analyserRef.current.getFrequencyData());
      animationFrameId = requestAnimationFrame(updateFrame);
    };

    updateFrame();

    return () => {
      if (animationFrameId !== undefined) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div className='flex items-end justify-center gap-x-1 h-28 overflow-x-hidden'>
      {frame.map((f, index) => (
        <div
          key={index}
          style={{ height: `${(f / 255) * 100}%` }}
          className='w-1.5 min-h-2.5 bg-white/50 rounded-t-full'
        />
      ))}
    </div>
  );
};

const AudioPlayer = () => {
  return (
    <CodeBlock code={code}>
      <div className='re-audio-sample'>
        <Audio
          playlist={[
            { id: 1, src: _1_mp3, name: 'for-her-chill' },
            { id: 2, src: _2_mp3, name: 'trap-type-beat-rap-instrumental-riff' },
            { id: 3, src: _3_mp3, name: 'whip-afro-dancehall' },
          ]}
        >
          {({
            loading,
            trackIndex,
            playlist,
            playing,
            togglePlay,
            duration,
            currentTime,
            volume,
            setVolume,
            prevTrack,
            nextTrack,
            rewindTrack,
            forwardTrack,
            setCurrentTime,
          }) => (
            <div>
              <div className='flex'>
                <div className='flex max-md:flex-col justify-between gap-4 w-full'>
                  <div className='flex items-center gap-4'>
                    <div className='size-[60px] bg-[#c4c4c4] rounded' />

                    <div className='flex flex-col'>
                      <span className='capitalize'>
                        {/* @ts-ignore */}
                        {playlist[trackIndex].name.split(/-/).join(' ')}
                      </span>
                      <span>{formatTime(currentTime)}</span>
                    </div>
                  </div>

                  <div className='flex items-center max-md:justify-center gap-x-4'>
                    <button type='button' onClick={rewindTrack.bind(null, 10)}>
                      <IconPlayerSkipBackFilled />
                    </button>

                    <button type='button' onClick={prevTrack}>
                      <IconPlayerTrackPrevFilled />
                    </button>

                    <button type='button' onClick={togglePlay}>
                      {playing ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
                    </button>

                    <button type='button' onClick={nextTrack}>
                      <IconPlayerTrackNextFilled />
                    </button>

                    <button type='button' onClick={forwardTrack.bind(null, 10)}>
                      <IconPlayerSkipForwardFilled />
                    </button>
                  </div>
                </div>
              </div>

              <div className='mt-4'>
                <input
                  type='range'
                  min='0'
                  max={duration}
                  step='1'
                  className='w-full'
                  value={currentTime}
                  onChange={e => setCurrentTime(+e.currentTarget.value)}
                />
              </div>

              <div className='flex items-center justify-between gap-x-4'>
                <div className='flex items-center gap-x-2 mt-4'>
                  <IconVolume2 />

                  <input
                    type='range'
                    min='0'
                    max='100'
                    className='w-full md:w-[150px]'
                    value={volume}
                    onChange={e => setVolume(+e.currentTarget.value)}
                  />

                  <IconVolume />
                </div>

                {loading && <span className='max-lg:text-sm mt-2'>loading...</span>}
              </div>

              <div className='mt-8'>
                <Visualizer />
              </div>
            </div>
          )}
        </Audio>
      </div>
    </CodeBlock>
  );
};

export default AudioPlayer;
