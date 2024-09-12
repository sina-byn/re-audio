// * components
import CodeBlock from '../components/CodeBlock';
import { Audio, formatTime } from '../components/ReAudio';

// * icons
import {
  IconPlayerPlayFilled,
  IconPlayerPauseFilled,
  IconPlayerSkipBackFilled,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
  IconPlayerSkipForwardFilled,
  IconVolume,
  IconVolume2,
  IconVolume3,
} from '@tabler/icons-react';

// * styles
import '../css/tailwind.css';

const code = `// AudioPlayer.tsx

import { Audio } from 're-audio';

const App = () => {
    return (
      <div className='re-audio-sample'>
        <Audio
          playlist={[
            { id: 1, src: '/audio/1.mp3', name: 'for-her-chill' },
            { id: 2, src: '/audio/2.mp3', name: 'trap-type-beat-rap-instrumental-riff' },
            { id: 3, src: '/audio/3.mp3', name: 'whip-afro-dancehall' },
          ]}
        >
          {({
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
            </div>
          )}
        </Audio>
      </div>
    );
};

export default App;
`;

const Basic = () => {
  return (
    <CodeBlock code={code}>
      <div className='re-audio-sample'>
        <Audio
          playlist={[
            { id: 1, src: '/audio/1.mp3', name: 'for-her-chill' },
            { id: 2, src: '/audio/2.mp3', name: 'trap-type-beat-rap-instrumental-riff' },
            { id: 3, src: '/audio/3.mp3', name: 'whip-afro-dancehall' },
          ]}
        >
          {({
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
            </div>
          )}
        </Audio>
      </div>
    </CodeBlock>
  );
};

export default Basic;
