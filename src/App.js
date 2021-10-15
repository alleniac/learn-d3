import { useState, useEffect } from 'react';
import * as d3 from 'd3';
import './App.css';

const csvUrl =
  'https://gist.githubusercontent.com/alleniac/0bd95735c0e6ccc0cc84975f8027da99/raw/c6db8cd8c0600f5a8d0810f66a19ebb24e863264/cssNamedColors.csv';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    d3.csv(csvUrl).then((data) => {
      setData(data);
    });
  }, []);

  return <div></div>;
}

export default App;
