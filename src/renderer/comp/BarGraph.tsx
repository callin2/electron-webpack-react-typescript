import * as React from 'react';
import { letterFrequency, browserUsage, genDateValue, appleStock} from '@vx/mock-data';
import { Group } from '@vx/group';
import { Bar } from '@vx/shape';
import { scaleLinear, scaleBand } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { GradientOrangeRed } from '@vx/gradient';

// We'll use some mock data from `@vx/mock-data` for this.
// const data = letterFrequency;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };


// Finally we'll embed it all in an SVG
export function BarGraph(props) {
    console.log('BarGraph', props)
    const {width,height} = props;

    const data = props.data.rows

    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    if(xMax < 1 || yMax < 1) return null;

// We'll make some helpers to get at the data we want
    const x = d => +d.time;
    const y = d => +d.charge_amount_at_the_time;

// And then scale the graph by our data
    const xScale = scaleBand({
        rangeRound: [0, xMax],
        domain: data.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        rangeRound: [yMax, 0],
        domain: [0, Math.max(...data.map(y))],
    });

// Compose together the scale and accessor functions to get point functions
    const compose = (scale, accessor) => (data) => scale(accessor(data));
    const xPoint = compose(xScale, x);
    const yPoint = compose(yScale, y);



    return (
        <svg width={props.width} height={props.height}>
            {data.map((d, i) => {
                const barHeight = yMax - yPoint(d);
                return (
                    <Group key={`bar-${i}`} top={margin.top} left={margin.left}>
                        <Bar
                            x={xPoint(d)}
                            y={yMax - barHeight}
                            height={barHeight}
                            width={xScale.bandwidth()}
                            fill='#fc2e1c'
                        />
                    </Group>
                );
            })}
        </svg>
    );
}