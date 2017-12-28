import * as React from 'react';
import { observable, computed, action } from "mobx";
import { observer, Provider } from "mobx-react";
import {Tab, Table, Header, Menu, Item, Grid, Form, Segment, Button, Message, Image, Accordion, Icon} from "semantic-ui-react";
import {ReactElement} from "react";
import ChartContainer from "../container/ChartContainer";

var query = `select a.time AS time, a.total_charge_amount AS charge_amount_at_the_time from (
    match (n:station)-[r:transaction]->(m:echarger)
    where r.ec_charge_start_time > '20171226100000'
      and r.ec_charge_start_time < '20171227115959'
    return substring(r.ec_charge_start_time,0,10) as time, sum(r.charge_amount) as total_charge_amount) a 
group by time, charge_amount_at_the_time;`


/**
 * 챠트에서 사용할 데이타를 조회하는 쿼리 및 파라미터를 설정 할 수 있습니다.
 */
const DataSetList = {
    sampleDs : {
        query: query,
        param: {}
    },

    sampleGraphDs: {
        query: ``,
        param: {}
    }
};

/**
 * 각 탭에서 챠트의 배치를 설정 할 수 있습니다.
 *
 */
const LayoutConfig = {
    'Block Chain': [
        {chartType:'bar', title:'11 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:0, y:0, w:6, h: 13 , minW:2, minH:3}},
        {chartType:'bar', title:'11 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:6, y:0, w:6, h: 5 , minW:2, minH:3}},
        {chartType:'bar', title:'11 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:6, y:0, w:6, h: 8 , minW:2, minH:3}},
    ],
    'E-Charger': [
        {chartType:'bar', title:'22 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:1, y:0, w:4, h: 7 , minW:2, minH:3}},
        {chartType:'bar', title:'22 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:1, y:0, w:4, h: 9 , minW:2, minH:3}},
    ],
    'ETC': [
        {chartType:'map', title:'11 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:0, y:0, w:6, h: 9 , minW:2, minH:3, static: true}},
        {chartType:'bar', title:'33 Bar Chart', dataset: DataSetList['sampleDs'], bounds: {x:6, y:0, w:3, h: 5 , minW:2, minH:3}},
    ]
};


class TabModel {
    @observable activeTab: string = null;
    @observable tabList: any[] = [
        // {name: 'Block Chain' },
        // {name: 'E-Charger' },
        // {name: 'ETC' }
    ];

    @action
    setActiveTab(tab: string) {
        this.activeTab = tab;
    }

    @computed
    get activeTabLayout() {
        console.log('this.activeTab', this.activeTab)
        if(!this.activeTab) return []
        return LayoutConfig[this.activeTab];
    }
}


class ThirdPageModel {
    @observable tabs: TabModel = new TabModel();
}


const MenuTab = observer(({tabs})=>{
    return <Menu.Menu>
        {tabs.tabList.map((tab)=>{
            return <Menu.Item
                key={tab.name}
                name={tab.name}
                active={tabs.activeTab === tab.name}
                onClick={()=>tabs.setActiveTab(tab.name)}
            />
        })}
    </Menu.Menu>
});


const MenuPane = ({children}) => {
    return <div className='ui bottom attached'  style={{height:'calc(100% - 40px)'}}>
        {children}
    </div>
};






@observer
class ThirdPage extends React.Component {

    activeItem: string;
    charts: ReactElement<any>;
    activeLayout: any;

    store: ThirdPageModel;
    constructor(props) {
        super(props);

        this.store = new ThirdPageModel()
        this.store.tabs.tabList = Object.keys(LayoutConfig).map((k)=>({name:k}))
        this.store.tabs.activeTab = this.store.tabs.tabList[0]
    }

    @action
    handleTabChange = (evt, data) => {
        this.activeItem = data.name;
        this.activeLayout = LayoutConfig[this.activeItem];
    };

    render() {
        return <div style={{height:'100%'}}>
            <Menu attached='top' inverted pointing color={'teal'}>
                <Menu.Item as='a' header>
                    <Icon name='settings' />
                    V_BA
                </Menu.Item>
                <MenuTab tabs={this.store.tabs}/>
            </Menu>

            <MenuPane>
                <ChartContainer layout={this.store.tabs.activeTabLayout}/>
            </MenuPane>
        </div>
    }
}

export default ThirdPage