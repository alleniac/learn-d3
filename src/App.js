import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const csvUrl =
  'https://gist.githubusercontent.com/alleniac/0bd95735c0e6ccc0cc84975f8027da99/raw/c6db8cd8c0600f5a8d0810f66a19ebb24e863264/cssNamedColors.csv';

const width = window.innerWidth;
const height = window.innerHeight;
const centerX = width / 2;
const centerY = height / 2;

const pieArc = d3.arc().innerRadius(0).outerRadius(width);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then((data) => {
      setData(data);
    });
  }, []);

  if (!data) {
    return <pre>Loading...</pre>;
  }

  console.log(data);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${centerX}, ${centerY})`}>
        {data.map((d, index) => (
          <path
            d={pieArc({
              startAngle: (index / data.length) * 2 * Math.PI,
              endAngle: ((index + 1) / data.length) * 2 * Math.PI,
            })}
            fill={d['RGB hex value']}
          ></path>
        ))}
      </g>
    </svg>
  );
}

export default App;
