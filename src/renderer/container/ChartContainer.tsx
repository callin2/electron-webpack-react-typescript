import * as React from "react";
import * as ReactGridLayout from 'react-grid-layout';
import { WidthProvider, Responsive } from "react-grid-layout";

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
    bounds: { x:number, y:number, w:number, h: number, static?:boolean, minH?:number, minW?:number}
}


class ChartContainerModel {
    @observable layoutList: LayoutInfo[] = [];

    @computed
    get RGLLayout() {
        if(!this.layoutList) return []

        return this.layoutList.map((l, idx)=>{
            return Object.assign({i:idx.toString()},l.bounds)
        })
    }

    get RGLLayouts() {
        if(!this.layoutList) return {lg:[]}

        const size = ['lg','md','sm','xs','xxs']

        var oneLatout = this.layoutList.map((l, idx)=>{
            return Object.assign({i:idx.toString()},l.bounds)
        })

        return size.reduce((memo,s,idx,arr)=>{
            memo[s]=oneLatout
            return memo;
        },{})
    }
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);


@observer
class ChartContainer extends React.Component<ChartContainerProp,{}> {
    store: ChartContainerModel;

    constructor(props) {
        super(props)

        console.log('props, ', props)

        this.store = new ChartContainerModel();
        this.store.layoutList = props.layout ? props.layout : []
    }

    componentWillReceiveProps(newProps) {
        console.error('componentWillReceiveProps', newProps)
        this.store.layoutList = newProps.layout
    }

    handleLayoutChange(layout, layouts) {
        console.log(layout, layouts)
    }

    render() {
        return <div style={{height:'100%'}}>
            <ResponsiveReactGridLayout
                className='layout'
                style={{height: '100%'}}
                layouts={this.store.RGLLayouts}
                cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
                rowHeight={50}
                onLayoutChange={(layout, layouts) =>
                    this.handleLayoutChange(layout, layouts)
                }
                >
                {this.store.layoutList.map((l, idx)=>{
                    return <div key={idx.toString()} style={{border:'1px solid black', overflow:'hidden', background:'rgba(255,255,255,0.3)'}}>
                        <HocGraph {...l}/>
                    </div>
                })}
            </ResponsiveReactGridLayout>
        </div>
    }
}


export default ChartContainer;