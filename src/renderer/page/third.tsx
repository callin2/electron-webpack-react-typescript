import * as React from 'react';
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import HocGraph from "../hoc/HocGraph";
import {Tab, Table, Header, Menu, Item, Grid, Form, Segment, Button, Message, Image, Accordion, Icon} from "semantic-ui-react";
import SecondPage from "./second";
import {ReactElement} from "react";
import ChartContainer from "../comp/ChartContainer";

var query = `select a.time AS time, a.total_charge_amount AS charge_amount_at_the_time from (
    match (n:station)-[r:transaction]->(m:echarger)
    where r.ec_charge_start_time > '20171226100000'
      and r.ec_charge_start_time < '20171227115959'
    return substring(r.ec_charge_start_time,0,10) as time, sum(r.charge_amount) as total_charge_amount) a 
group by time, charge_amount_at_the_time;`


var chartLayoutConfig = [
    {chartType: 'bar', q: query, p:{}},
    {chartType: 'line', q: query, p:{}}
];




const dashboardLayout = [

]


/**bserver
 * {chartLayoutConfig.map((conf, idx)=>{
                return <HocGraph  {...conf} key={idx}/>
            })}
 */


const LayoutConfig = {
    'Block Chain': [],
    'E-Charger': [],
    'ETC': []
};


class ThirdPageModel {
    @observable activeTab: string = 'Block Chain';

    @action
    setActiveTab(tab: string) {
        this.activeTab = tab;
    }
}


@observer
class ThirdPage extends React.Component {

    activeItem: string;
    charts: ReactElement<any>;
    activeLayout: any;

    store: ThirdPageModel;
    constructor(props) {
        super(props);
        this.store


    }

    @action
    handleTabChange = (evt, data) => {
        this.store = new ThirdPageModel();
        this.activeItem = data.name;
        this.activeLayout = LayoutConfig[this.activeItem];
    };

    render() {
        return <div>
            <Menu attached='top' inverted pointing color={'teal'}>
                <Menu.Item as='a' header>
                    <Icon name='settings' />
                    V_BA
                </Menu.Item>

                <Menu.Menu>
                    <Menu.Item name='Block Chain' active={this.activeItem === 'Block Chain'} onClick={this.handleTabChange}/>
                    <Menu.Item name='E-Charger' active={this.activeItem === 'E-Charger'} onClick={this.handleTabChange}/>
                    <Menu.Item name='ETC' active={this.activeItem === 'ETC'} onClick={this.handleTabChange}/>
                </Menu.Menu>

            </Menu>

            <div className='ui bottom attached'>
                <ChartContainer layout={this.activeLayout}/>
            </div>
        </div>
    }
}

export default ThirdPage