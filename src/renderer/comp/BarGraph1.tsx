import * as React from "react";
import * as echarts from "echarts";

class BarGraph1 extends React.Component{
    
    options = {
            title: {
                //text: '2000-2016年中国汽车销量及增长率'
            },
            tooltip: {
                trigger: 'axis'
            },
            toolbox: {
                feature: {
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            grid: {
                containLabel: true
            },
            legend: {
                data: ['선','막대']
            },
            xAxis: [{
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016']
            }],
            yAxis: [{
                type: 'value',
                name: '선',
                min: 0,
                max: 50,
                position: 'right',
                axisLabel: {
                    formatter: '{value} %'
                }
            }, {
                type: 'value',
                name: '막대',
                min: 0,
                max: 3000,
                position: 'left'
            }],
            series: [{
                name: '선',
                type: 'line',
                stack: '막대',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                        }
                    },
                lineStyle: {
                        normal: {
                            width: 3,
                            shadowColor: 'rgba(0,0,0,0.4)',
                            shadowBlur: 10,
                            shadowOffsetY: 10
                        }
                    },
                data: [1,13,37,35,15,13,25,21,6,45,32,2,4,13,6,4,11]
            }, {
                name: '막대',
                type: 'bar',
                yAxisIndex: 1,
                stack: '막대',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                data: [209,236,325,439,507,576,722,879,938,1364,1806,1851,1931,2198,2349,2460,2735]
            }]
    };
    _divElem: any;
    private myChart: any;
    
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
      const x = d => +d.time.substring(4,10);
      console.log('x함수', x);
      console.log('x축', prevProp.data.rows.map(x));
      console.log('변경 전 xAxis', this.options.xAxis[0].data);
      
      this.options.xAxis[0].data = prevProp.data.rows.map(x);
      console.log('변경 후 xAxis', this.options.xAxis[0].data);
      console.log('componentWillReceiveProps', prevProp, nextProp);
  }
    
    render(){
        return <div ref={divElem=>this._divElem=divElem} style={{height:'100%'}}>
        </div>
    }
}

export default BarGraph1