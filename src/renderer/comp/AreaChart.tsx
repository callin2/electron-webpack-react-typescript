import * as React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveBasis, curveMonotoneX } from '@vx/curve';
import { extent, max, min } from 'd3-array';
import { AxisBottom, AxisLeft } from '@vx/axis';

export default function LineGraph(props){
    console.log('LineGraph',props);

    // bounds
    const {width,height} = props;
    const margin = { top: 10, bottom: 70, left: 70, right: 50 };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    // data
    const data = props.data.rows;

    // x,y setting
    const x = d => +d.graph_time;

    let y = d => +d.current_sales;
//    const x_2 = d => +d.current_time;

    // current time scales

    const xScale = scaleTime({
        range: [0, xMax],
        domain: extent(data, x),
//        domain: [0, max(data, x)],
//        domain: data.map(x),
    });

    const yScale = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
        nice: true,
    });

    // y resetting
    y = d => d.avg_sales_amount;

    // avg sales amount scales
//    const xScale_2 = scaleTime({
//        range: [0, xMax],
//        domain: extent(data, x_2),
//    });
    const yScale_2 = scaleLinear({
        range: [yMax, 0],
        domain: [0, max(data, y)],
        nice: true,
    });

    const tickLabel = <text fill="grey" opacity="0.20" fontSize={10} dy="0.25em" textAnchor="middle" fontWeight="bold" />
    /*          기존 소스 임시 주석
                <LinePath
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y}
                    stroke='#7e20dc'
                    strokeWidth={2}
                    strokeDasharray='2,2'
                    curve={curveBasis}
                />
     */
    return (
        <svg width={width} height={height}>
            <rect
                x={0}
                y={0}
                width={width}
                height={height}
                fill="#FFFFFF"
                rx={14}
            />
            <Group top={margin.top} left={margin.left}>
                <AxisLeft
                    scale={yScale}
                    top={margin.top}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                    tickLabelComponent={tickLabel}
                />
                <AxisBottom
                    scale={xScale}
                    top={height - margin.bottom}
                    //                    tickFormat = {x.tickFormat("%m/%d")}
                    numTicks={4}
                    stroke={'#1b1a1e'}
                    tickTextFill={'#1b1a1e'}
                />
                <LinePath
                    data={data}
                    xScale={xScale}
                    yScale={yScale}
                    x={x}
                    y={y}
                    stroke='#7e20dc'
                    strokeWidth={3}
                    curve={curveMonotoneX}
                    glyph={(d,i) => {
                        return (
                            <g key={`line-point-${i}`}>
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale(y(d))}
                                    r={6}
                                    fill='#fff'
                                    stroke='#01f2ff'
                                    strokeWidth={10}
                                />
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale(y(d))}
                                    r={6}
                                    fill='#01f2ff'
                                    stroke='#7e20dc'
                                    strokeWidth={3}
                                />
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale(y(d))}
                                    r={4}
                                    fill='#ffffff'
                                />
                            </g>
                        );
                    }}
                />
                <LinePath
                    data={data}
                    xScale={xScale}
                    yScale={yScale_2}
                    x={x}
                    y={y}
                    stroke='#FF0000'
                    strokeWidth={3}
                    curve={curveMonotoneX}
                    glyph={(d,i) => {
                        return (
                            <g key={`line-point-${i}`}>
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale_2(y(d))}
                                    r={6}
                                    fill='#fff'
                                    stroke='#01f2ff'
                                    strokeWidth={10}
                                />
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale_2(y(d))}
                                    r={6}
                                    fill='#01f2ff'
                                    stroke='#7e20dc'
                                    strokeWidth={3}
                                />
                                <GlyphDot
                                    cx={xScale(x(d))}
                                    cy={yScale_2(y(d))}
                                    r={4}
                                    fill='#ffffff'
                                />
                            </g>
                        );
                    }}
                />
            </Group>
        </svg>
    );
}