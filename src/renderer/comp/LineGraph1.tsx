import * as React from "react";
import * as echarts from "echarts";


function randomData() {
    now = new Date(+now + oneDay);
    value = value + Math.random() * 21 - 10;
    return {
        name: now.toString(),
        value: [
            [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'), 
            Math.round(value)
        ]
    }
}

var data = [];
var now = new Date(1997, 9, 3);
var oneDay = 24 * 3600 * 1000;
var value = Math.random() * 1000;
for (var i = 0; i < 1000; i++) {
    data.push(randomData());
}

class LineGraph1 extends React.Component{
    
    
    options = {
            title: {
                text: '라인 차트'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0];
                    var date = new Date(params.name);
                    return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                name: '임의 데이터',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: data
            }]
    };
    
    _divElem: any;
    myChart: any;
    
    componentDidMount() {
        this.myChart = echarts.init(this._divElem)
        this.myChart.setOption(this.options, true)

    }
        
    componentWillReceiveProps(prevProp, nextProp) {
//      agclient.query(nextProp.query, nextProp.param).then({rslt}=>{
//          //set option
//          this.option.serf
//          
//      })
        
        setInterval(()=>{

            for (var i = 0; i < 5; i++) {
                data.shift();
                data.push(randomData());
            }
//            console.log('뭐지',JSON.stringify(data));
            
            this.myChart.setOption({
                series: [{
                    data: data
                }]
            });
        }, 1000);
        
//      console.log('componentWillReceiveProps', prevProp, nextProp)
  }
    
    render(){
        
        return <div ref={divElem=>this._divElem=divElem} style={{height:'100%'}}>
        </div>
    }
}

export default LineGraph1

