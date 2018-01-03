import * as React from 'react'
import {BarGraph} from "../comp/BarGraph";
import LineGraph from "../comp/LineGraph";
import { resolve } from "react-resolver";
import { ParentSize } from '@vx/responsive';
import withFrame from "./withFrame";
import {AGraphDataProvider} from "../common/dataprovider/AgensGraphDataProvider";
import MapGraph from "../comp/MapGraph";
import {DataGrid} from "../comp/DataGrid";
import {CYMap} from "../comp/CYMap";
import AreaChart from "../comp/AreaChart";
import NumberChart from "../comp/NumberChart";
import ECharts from "../comp/ECharts";
import TestChart from "../comp/TestChart";

function findGraphByType(gType: string) {
    console.log('gType', gType)
    switch(gType) {
        case 'bar': return BarGraph;
        case 'line': return LineGraph;
        case 'grid': return DataGrid;
        case 'graph': return LineGraph;
        case 'cymap': return CYMap;
        case 'map': return MapGraph;
        case 'area': return AreaChart;
        case 'number': return NumberChart;
        case 'echarts': return ECharts;
        case 'test': return TestChart;
    }
}


var config = {
    user: 'v_ba',
    password: 'blockchain!',
    database: 'v_ba',
    graph_path:'v_ba',
    host: '27.117.163.21',
    port: 5559
};

var config_local = {
    user: 'v_ba',
    password: 'blockchain!',
    database: 'v_ba',
    graph_path:'v_ba',
    host: '192.168.0.47',
    port: 5432
};

export default function HocGraph(props) {
    console.log('HocGraph', props)

    var Graph = resolve("data", (p)=>{
        console.log('propxxs', p);

        var dataProvider = new AGraphDataProvider()
        return dataProvider.configure(config_local)
            .then((prv)=>prv.connect())
            .then((prv)=>prv.queryPromise(props.dataset.query))

        // return dataProvider.queryPromise(props.dataset.query)

        // return Promise.resolve(100);
    })(withFrame(findGraphByType(props.chartType)));

    return <Graph {...props}/>
}