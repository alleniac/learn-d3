import * as d3 from 'd3'

export const Mouth = ({mouthRadius, mouthWidth}) => {
  const mouthArc = d3.arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI / 2)
    .endAngle(Math.PI * 3 / 2);
  return <path d={mouthArc()}></path>
}