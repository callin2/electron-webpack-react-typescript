import * as React from 'react';


// Finally we'll embed it all in an SVG
export default function NumberChart(props) {

    
    options = {

    
    }

    componentDidMount() {
        this.myChart = echarts.init(this.divElem)
        this.myChart.setOption(this.option, true)
    }


    render() {
        return <div ref={div=>this.divElem=div} style={{height:'100%'}}>
        </div>
    }


    componentWillReceiveProps(prevProp, nextProp) {
        console.log('componentWillReceiveProps', prevProp, nextProp)
    }
}


export default Echarts;
}


