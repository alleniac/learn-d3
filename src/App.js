import './App.css';
import { range } from 'd3-array';
import { Face } from './Face';

const width = 160;
const height = 160;

const array = range(20);

function App() {
  return (
    <>
      {array.map(() => (
        <Face
          width={width}
          height={height}
          centerX={width / 2}
          centerY={height / 2}
          strokeWidth={10}
          eyeOffsetX={30}
          eyeOffsetY={30}
          eyeRadius={10}
          mouthWidth={10}
          mouthRadius={40}
        />
      ))}
    </>
  );
}

export default App;
