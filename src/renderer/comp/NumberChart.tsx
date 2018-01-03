import * as React from 'react';
import * as echarts from "echarts";

class NumberChart extends React.Component {
    
    option = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: 'DETAIL',
                type: 'gauge',
                detail: {formatter:'{value}'},
                data: [{value: 72, name: 'MyValue'}]
            }
        ]
    };

    private _divElem:any
    private myChart:any

    componentDidMount() {
        this.myChart = echarts.init(this._divElem)
        this.myChart.setOption(this.option, true)
    }


    render() {
        return <div ref={divElem=>this._divElem=divElem} style={{height:'100%'}}>
        </div>
    }

}

export default NumberChart;

