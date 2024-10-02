# re-audio [![NPM version](https://img.shields.io/npm/v/@sina_byn/re-audio.svg?style=flat)](https://www.npmjs.com/package/@sina_byn/re-audio) [![NPM monthly downloads](https://img.shields.io/npm/dm/@sina_byn/re-audio.svg?style=flat)](https://npmjs.org/package/@sina_byn/re-audio) [![NPM total downloads](https://img.shields.io/npm/dt/@sina_byn/re-audio.svg?style=flat)](https://npmjs.org/package/@sina_byn/re-audio) 

> Creating audio players in React has never been easier

![re-audio banner](/public/banner.png)

> Make sure to visit the documentation website at [https://sina-byn.github.io/re-audio/](https://sina-byn.github.io/re-audio/)

- Built with TypeScript for seamless integration in TypeScript projects
- Fully customizable with a headless component architecture
- Developer-friendly with an intuitive API


## Installation
```bash
npm i --save @sina_byn/re-audio
```

## Usage

```tsx
// * AudioPlayer.tsx

import { Audio, formatTime } from '@sina_byn/re-audio';

// * components
import PlayBackControls from './PlayBackControls';

const AudioPlayer = () => {
    return () => (
        <Audio 
          playlist={[
            { id: 1, src: '/audio/1.mp3', name: 'for-her-chill' },
            { id: 2, src: '/audio/2.mp3', name: 'trap-type-beat-rap-instrumental-riff' },
            { id: 3, src: '/audio/3.mp3', name: 'whip-afro-dancehall' },
          ]}
        >
            {audioContext => (
                <div>
                    <header style={{ display: 'flex', gap: '1rem' }}>
                        <span>{formatTime(audioContext.currentTime)}</span>
                        <span>/</span>
                        <span>{formatTime(audioContext.duration)}</span>
                    </header>

                    <footer style={{ display: 'flex', gap: '1rem' }}>
                        <PlayBackControls />
                    </footer>
                </div>
            )}
        </Audio>
    );
};

export default AudioPlayer;
```

```tsx
// * PlayBackControls.tsx

import { useAudio } from '@sina_byn/re-audio';

const PlayBackControls = () => {
    const { playing, togglePlay, prevTrack, nextTrack } = useAudio();

    return (
        <>
            <button type='button' onClick={prevTrack}>
                prev
            </button>

            <button type='button' onClick={togglePlay}>
                {playing ? 'pause' : 'play'}
            </button>

            <button type='button' onClick={nextTrack}>
                next
            </button>
        </>
    )
};

export default PlayBackControls;
```