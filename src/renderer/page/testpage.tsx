import * as React from "react";
import {Children} from "react";
import * as ag from 'agensgraph';
import DevTool from 'mobx-react-devtools';
import { ParentSize } from '@vx/responsive';
import { Header, Icon } from 'semantic-ui-react'



import {observable, computed, action, reaction, autorun, autorunAsync} from "mobx";
import {observer} from "mobx-react";
import {AGraphDataProvider} from "../common/dataprovider/AgensGraphDataProvider";
import AreaChart from "../comp/AreaChart";

function uuid() {
    var i, random;
    var uuid = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            uuid += '-';
        }
        uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return uuid;
}


var config = {
    user: 'v_ba',
    password: 'blockchain!',
    database: 'v_ba',
    graph_path:'v_ba',
    host: '27.117.163.21',
    port: 5559
};

var config_local = {
    user: 'v_ba',
    password: 'blockchain!',
    database: 'v_ba',
    graph_path:'v_ba',
    host: '192.168.0.47',
    port: 5432
};


function withFrame(BaseComponent) {
    class WrappedComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return <React.Fragment>
                <Header size='small' attached='top' color='red' inverted>
                    {this.props['title']}
                </Header>
                <div className='ui bottom attached' style={{height:'calc(100% - 40px)'}}>
                    <ParentSize>
                        {parent=>{
                            return <BaseComponent {...parent} {...this.props} />
                        }}
                    </ParentSize>
                </div>

            </React.Fragment>
        }
    }

    return WrappedComponent;
}



class CharContainerModel {
    @observable chartList = [];
    @observable param = {};

    @action
    addChart (title, query) {
        this.chartList.push(new ChartModel(this, uuid(), title, query));
    }

    toJS() {
        return this.chartList.map(todo => todo.toJS());
    }

    static fromJS(array) {
        const chartConainer = new CharContainerModel();
        chartConainer.chartList = array.map(item => ChartModel.fromJS(chartConainer, item));
        return chartConainer;
    }

    remove(chart: ChartModel) {
        var index = this.chartList.indexOf(chart);
        this.chartList.splice(index, 1);

    }

    @action
    updateFilter(param: object) {
        console.log('updateFilter', param)
        var nextParam = Object.assign({},this.param,param)
        this.param = nextParam

        this.chartList.forEach(
            chart => chart.param = this.param
        );
    }
}




class ChartModel {
    chartId;
    chartContainer: CharContainerModel;
    data;
    error;
    @observable param: any;
    @observable query: any;
    @observable title;
    @observable fetching: boolean = false;

    constructor(chartContaner, chartId, title, query) {
        this.chartContainer = chartContaner;
        this.chartId = chartId;
        this.title = title;
        this.query = query;
        this.param = chartContaner.param;
    }

    @action
    updateFilter(param: object) {
        this.chartContainer.updateFilter(param);
    }

    destroy() {
        this.chartContainer.remove(this);
    }

    @action
    fetchData() {
        console.log('fetchData!!!!')
        this.fetching = true;
        // this.data = null;
        this.error = null;

        var dataProvider = new AGraphDataProvider()
        dataProvider.configure(config)
            .then((prv)=>prv.connect())
            .then((prv)=>prv.queryPromise(this.query))
            .then((d)=>{
                this.data = d
                this.fetching = false
            }).catch((err)=>{
                this.data = null
                this.error = err
                this.fetching = false
            })
    }

    toJS() {
        return {
            chartId: this.chartId,
            title: this.title,
            query: this.query,
            param: this.param
        };
    }

    static fromJS(chartContaner, object) {
        return new ChartModel(chartContaner, object.chartId, object.title, object.query);
    }
}

interface ChartContProp {
    model: CharContainerModel
}

@observer
class ChartCont extends React.Component<ChartContProp,{}> {
    constructor(props) {
        super(props)
    }

    render() {
        return <React.Fragment>
            {this.props.model.chartList.map((c, idx)=>{
                return <Chart key={idx} model={c}></Chart>
            })}
        </React.Fragment>
    }
}


interface ChartProp {
    model: ChartModel
}

@observer
class Chart extends React.Component<ChartProp,{}> {
    constructor(props) {
        super(props)

        reaction(()=> this.props.model.param,
            (param)=>this.props.model.fetchData()
        )
    }

    removeSelf = () => {
        this.props.model.chartContainer.remove(this.props.model)
    };

    componentDidMount() {
        this.props.model.fetchData();
    }

    changParam = (evt) => {
        var target = evt.target
        console.dir(target)
        this.props.model.updateFilter( {'new p': target.textContent})
    };

    render() {
        return <div>
            <Header size='small' attached='top' color='red' inverted>
                {this.props.model.title}
                <div>{this.props.model.fetching.toString()}</div>
            </Header>
            <div className='ui bottom attached' style={{height:'calc(100% - 40px)'}}>
                {this.props.model.error &&
                    <div>{this.props.model.error.toString()}</div>
                }
                {!this.props.model.error &&
                    <ParentSize>
                        {parent => {
                            return <AreaChart/>
                        }}
                    </ParentSize>
                }
            </div>

        </div>
    }
}


var barQuery = `SELECT a.time AS time, a.total_charge_amount AS charge_amount_at_the_time FROM (
            MATCH (n:station)-[r:transaction]->(m:echarger)
            WHERE r.ec_charge_start_time > '20171226100000'
              AND r.ec_charge_start_time < '20171229115900'
            RETURN substring(r.ec_charge_start_time,0,10) as time, sum(r.charge_amount) as total_charge_amount) a
        WHERE a.total_charge_amount <> 0 
        GROUP BY time, charge_amount_at_the_time;`

@observer
export class TestPage extends React.Component {
    ccModel: CharContainerModel

    constructor(props) {
        super(props)

        this.ccModel = CharContainerModel.fromJS([{
            chartId:'1234', title:'xxx', query: barQuery
        }])
    }


    addChart = () => {
        this.ccModel.addChart(uuid(), 'query ##')
    };

    changeQueryParam = () => {
        this.ccModel.updateFilter({name:'xyz'})
    };



    render() {
        return <div>
            <button onClick={this.addChart}>add chart</button>
            <button onClick={this.changeQueryParam}>change param</button>
            <DevTool/>
            <ChartCont model={this.ccModel}/>

        </div>
    }
}