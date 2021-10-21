import { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './App.css';

const margin = {
  top: 20,
  right: 80,
  bottom: 30,
  left: 50,
};

const width = window.innerWidth - margin.left - margin.right;
const height = window.innerHeight - margin.top - margin.bottom;

const myData =
  'date	New York	San Francisco	Austin\n\
20111001	63.4	62.7	72.2\n\
20111002	58.0	59.9	67.7\n\
20111003	53.3	59.1	69.4\n\
20111004	55.7	58.8	68.0\n\
20111005	64.2	58.7	72.4\n\
20111006	58.8	57.0	77.0\n\
20111007	57.9	56.7	82.3\n\
20111008	61.8	56.8	78.9\n\
20111009	69.3	56.7	68.8\n\
20111010	71.2	60.1	68.7\n\
20111011	68.7	61.1	70.3\n\
20111012	61.8	61.5	75.3\n\
20111013	63.0	64.3	76.6\n\
20111014	66.9	67.1	66.6\n\
20111015	61.7	64.6	68.0\n\
20111016	61.8	61.6	70.6\n\
20111017	62.8	61.1	71.1\n\
20111018	60.8	59.2	70.0\n\
20111019	62.1	58.9	61.6\n\
20111020	65.1	57.2	57.4\n\
20111021	55.6	56.4	64.3\n\
20111022	54.4	60.7	72.4\n';

function App() {
  const holderRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const parsedData = d3.tsvParse(myData);

    // construct xAxis
    const timeParser = d3.timeParse('%Y%m%d');
    const dates = [];
    parsedData.forEach((d) => {
      dates.push(timeParser(d.date));
    });
    const xDomain = d3.extent(dates);
    const xScale = d3
      .scaleTime()
      .domain(xDomain)
      .range([0, width - margin.right]);
    const xAxis = d3.axisBottom(xScale);

    // Create categorical domain of 3 cities, and restructure the data
    // so that data look like:
    // { name: string; values: { date: string; temperature: number; } }[];
    const color = d3
      .scaleOrdinal(d3.schemeCategory10)
      .domain(Object.keys(parsedData[0]).filter((key) => key !== 'date'));

    const cities = color.domain().map((name) => ({
      name,
      values: parsedData.map((d) => ({
        date: d.date,
        temperature: +d[name],
      })),
    }));

    // construct yAxis
    const yDomainMin = cities.reduce((acc, city) => {
      const cityMin = city.values.reduce((ac, val) => {
        const cityTemperature = val.temperature;
        return cityTemperature < ac ? cityTemperature : ac;
      }, Number.MAX_VALUE);
      return cityMin < acc ? cityMin : acc;
    }, Number.MAX_VALUE);

    const yDomainMax = cities.reduce((acc, city) => {
      const cityMax = city.values.reduce((ac, val) => {
        const cityTemperature = val.temperature;
        return cityTemperature > ac ? cityTemperature : ac;
      }, Number.MIN_VALUE);
      return cityMax > acc ? cityMax : acc;
    }, Number.MIN_VALUE);

    const yScale = d3
      .scaleLinear()
      .domain([yDomainMin, yDomainMax])
      .nice()
      .range([height - margin.bottom, margin.top]);
    const yAxis = d3.axisLeft(yScale);

    // Init the svg object
    const svg = d3
      .select(holderRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // legend
    const legend = svg
      .selectAll('g')
      .data(cities)
      .enter()
      .append('g')
      .attr('class', 'legend');
    legend.append('rect').attr('x', width - margin.right);

    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, ${height - margin.bottom})`)
      .call(xAxis);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis);
    svg
      .append('g')
      .attr('transform', `translate(${margin.left + 10}, ${margin.top})`)
      .attr('text-anchor', 'end')
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 10)
      .text('Temperature');
  }, []);

  // if (!data) {
  //   return <pre>Loading...</pre>;
  // }

  return <div ref={holderRef}></div>;
}

export default App;
