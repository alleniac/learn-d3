import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl = '';

export const useData = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      return d;
    };
    csv(csvUrl, row).then((data) => {
      setData(data);
    });
  }, []);

  return data;
};
