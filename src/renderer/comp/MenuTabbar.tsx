import * as React from "react";
import {Segment} from "semantic-ui-react";


interface ChartContainerProp {
    store: any
}


export default class ChartContainer extends React.Component<ChartContainerProp, {}> {

    charts = null

    render() {
        return <Segment inverted color='black'>
            {this.charts}
        </Segment>
    }

}