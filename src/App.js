import { useState, useCallback } from 'react';
import './App.css';

const width = window.innerWidth;
const height = window.innerHeight;
const circleRadius = 30;

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: width / 2,
    y: height / 2,
  });

  const handleMouseMove = useCallback(
    (event) => {
      const { clientX, clientY } = event;
      setMousePosition({ x: clientX, y: clientY });
    },
    [setMousePosition],
  );

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}>
      <circle cx={mousePosition.x} cy={mousePosition.y} r={circleRadius} />
    </svg>
  );
}

export default App;
