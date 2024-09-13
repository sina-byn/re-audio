// * components
import { Audio } from './components';

const App = () => {
  return (
    <div>
      <Audio
        playlist={[
          { id: 1, src: '/1.mp3', name: 'for-her-chill' },
          { id: 2, src: '/2.mp3', name: 'trap-type-beat-rap-instrumental-riff' },
          { id: 3, src: '/3.mp3', name: 'whip-afro-dancehall' },
        ]}
      >
        {() => null}
      </Audio>
    </div>
  );
};

export default App;
