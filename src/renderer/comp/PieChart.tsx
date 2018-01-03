import * as React from "react";
import * as echarts from "echarts";

class PieChart extends React.Component {
    
    option = {
       tooltip: {
           trigger: 'item',
           formatter: "{a} <br/>{b}: {c} ({d}%)"
       },
       legend: {
           orient: 'vertical',
           x: 'left',
           data:['BMW I3','HYUNDAI IONIQ','KIA RAY','SAMSUNG SM3','NISSAN LEAF']
       },
       series: [
           {
               name:'访问来源',
               type:'pie',
               radius: ['50%', '70%'],
               avoidLabelOverlap: false,
               label: {
                   normal: {
                       show: false,
                       position: 'center'
                   },
                   emphasis: {
                       show: true,
                       textStyle: {
                           fontSize: '30',
                           fontWeight: 'bold'
                       }
                   }
               },
               labelLine: {
                   normal: {
                       show: false
                   }
               },
               data:[
                   {value:335, name:'KIA RAY'},
                   {value:310, name:'BMW I3'},
                   {value:234, name:'SAMSUNG SM3'},
                   {value:135, name:'NISSAN LEAF'},
                   {value:1548, name:'HYUNDAI IONIQ'}
               ]
           }
       ]
    };

    private divElem: any
    private pieChart: any

    componentDidMount() {
        this.pieChart = echarts.init(this.divElem)
        this.pieChart.setOption(this.option, true)
    }


    render() {
        return <div ref={div=>this.divElem=div} style={{height:'100%'}}>
        </div>
    }

}

export default PieChart;