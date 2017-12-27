
import * as React from 'react'
import {BarGraph} from "../comp/BarGraph";
import LineGraph from "../comp/LineGraph";
import { resolve } from "react-resolver";

function findGraphByType(gType: string) {
    switch(gType) {
        case 'bar': return BarGraph;
        case 'line': return LineGraph;
    }
}

export default function HocGraph({chartType,q,p}) {

    var Graph =  resolve("data", (props)=>{
        return Promise.resolve(100);
    })(findGraphByType(chartType));

    return <Graph/>
}