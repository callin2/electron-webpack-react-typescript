import * as React from "react";
import * as ReactGridLayout from 'react-grid-layout';
import HocGraph from "../hoc/HocGraph";
import {computed, observable, observe} from "mobx";
import {observer} from "mobx-react";


interface ChartContainerProp {
    layout?: any
}

export interface LayoutInfo {
    chartType: string
    title: string
    dataset: string,
    bounds: { x:number, y:number, w:number, h: number }
}


class ChartContainerModel {
    @observable layoutList: LayoutInfo[] = [];

    @computed
    get RGLLayout() {
        return this.layoutList.map((l, idx)=>{
            return Object.assign({i:idx.toString()},l.bounds)
        })
    }
}


@observer
class ChartContainer extends React.Component<ChartContainerProp,{}> {
    store: ChartContainerModel;

    constructor(props) {
        super(props)

        console.log('props, ', props)

        this.store = new ChartContainerModel();
        this.store.layoutList = props.layout
    }

    componentWillReceiveProps(newProps) {
        this.store.layoutList = newProps.layout
    }

    render() {
        return <div style={{height:'100%'}}>
            <ReactGridLayout className='layout' style={{height: '100%'}} layout={this.store.RGLLayout} cols={12} rowHeight={200} width={1280}>
                {this.store.layoutList.map((l, idx)=>{
                    return <div key={idx.toString()} style={{border:'1px solid black', overflow:'hidden', background:'rgba(255,255,255,0.3)'}}>
                        <HocGraph {...l}/>
                    </div>
                })}
            </ReactGridLayout>
        </div>
    }
}


export default ChartContainer;