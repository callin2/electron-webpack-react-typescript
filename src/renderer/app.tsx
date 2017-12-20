import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {ThemeProvider} from "styled-components";
import GoogleMapReact from 'google-map-react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar, ComposedChart, Area} from 'recharts';

import * as ReactGridLayout from 'react-grid-layout';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

console.log('ReactGridLayout', ReactGridLayout)

var ResponsiveReactGridLayout = ReactGridLayout.Responsive;

import 'semantic-ui-css/semantic.css';
import {Dropdown, Table, Header, Menu, Item, Grid, Form, Segment, Button, Message, Image, Accordion, Icon} from "semantic-ui-react";
import Dock from 'react-dock'

//
//
// const DockHandle = styled.div`
//   position: absolute;
//   width: 10px;
//   height: 10px;
//   right: 0px;
//   top: 0px;
//   bottom: 0px;
//   margin-right: -10px;
//   border-radius: 5px;
//   margin-top: auto;
//   margin-bottom: auto;
//   background: aquamarine;
//   z-index: 10;
//   cursor: pointer;
// `;


interface AppState {
    isLeftDockVisible: boolean
    activeIndex: number
    // items: any
    // breakpoint?: any
    // cols?: any
    // newCounter: number
    layouts?: any
}


class _App extends React.Component<{},AppState> {
    constructor(props) {
        super(props)
        this.state = {
            isLeftDockVisible: false,
            activeIndex: -1,
        }


        this.toggleSettings = this.toggleSettings.bind(this);
    }

    // onAddItem() {
    //     /*eslint no-console: 0*/
    //     console.log("adding", "n" + this.state.newCounter);
    //     this.setState({
    //         // Add a new item. It must have a unique key!
    //         items: this.state.items.concat({
    //             i: "n" + this.state.newCounter,
    //             x: (this.state.items.length * 2) % (this.state.cols || 12),
    //             y: Infinity, // puts it at the bottom
    //             w: 2,
    //             h: 2
    //         }),
    //         // Increment the counter to ensure key is always unique.
    //         newCounter: this.state.newCounter + 1
    //     });
    // }


    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    // onLayoutChange(layout) {
    //     this.setState({ layout: layout });
    // }

    // onBreakpointChange(breakpoint, cols) {
    //     this.setState({
    //         breakpoint: breakpoint,
    //         cols: cols
    //     });
    // }
    //
    // onRemoveItem(i) {
    //     console.log("removing", i);
    //     this.setState({ items: _.reject(this.state.items, { i: i }) });
    // }


    layout = [
        {i: 'a', x: 0, y: 0, w: 3, h: 2, static: true},
        {i: 'b', x: 3, y: 0, w: 1, h: 1 },
        {i: 'c', x: 3, y: 0, w: 1, h: 1 },
        {i: 'd', x: 0, y: 0, w: 1, h: 1},
        {i: 'e', x: 1, y: 0, w: 1, h: 1},
        {i: 'f', x: 2, y: 0, w: 1, h: 1},
        {i: 'g', x: 3, y: 0, w: 1, h: 1},
    ];

    private toggleSettings() {
        console.log("isLeftDockVisible")
        this.setState({isLeftDockVisible: !this.state.isLeftDockVisible})
    }


    data = [
        {name:'kia' , in: 100, out: 80 },
        {name:'kia' , in: 100, out: 80 },
        {name:'kia' , in: 100, out: 80 },
        {name:'kia' , in: 100, out: 80 },
        {name:'kia' , in: 100, out: 80 },
        {name:'kia' , in: 100, out: 80 },
    ];

    data2 = [
        {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
        {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
        {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
        {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
        {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
        {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
    ];

    data3 = [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
        {name: 'Page B', uv: 868, pv: 967, amt: 1506},
        {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
        {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
        {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
        {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];


    render() {
        const { activeIndex } = this.state

        return <div>
            <Menu fixed='top' inverted>

                    <Menu.Item as='a' header>
                        <Icon name='settings' onClick={this.toggleSettings} />
                        V_BA
                    </Menu.Item>
                    <Menu.Item as='a'>Home</Menu.Item>

                    <Dropdown item simple text='Dropdown'>
                        <Dropdown.Menu>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Header>Header Item</Dropdown.Header>
                            <Dropdown.Item>
                                <i className='dropdown icon' />
                                <span className='text'>Submenu</span>
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown.Item>
                            <Dropdown.Item>List Item</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
            </Menu>

            <ReactGridLayout className='layout' style={{height: '100vh', top:'47px', position:'absolute', background:'beige' }} layout={this.layout} cols={4} rowHeight={230} width={1024}>
                <div key="a" style={{border:'1px solid black', background:'darkred'}}>
                    <GoogleMapReact
                        apiKey='AIzaSyBFKy2PETbXuW2gj5FFar1c8LzGv1DqBc0'
                        defaultCenter={{lat: 35.013243, lng: 126.717850}}
                        defaultZoom={13}
                    >
                        {/*<AnyReactComponent*/}
                        {/*lat={59.955413}*/}
                        {/*lng={30.337844}*/}
                        {/*text={'Kreyser Avrora'}*/}
                        {/*/>*/}
                    </GoogleMapReact>
                </div>
                <div key="b" style={{border:'1px solid black', overflow:'hidden'}}>
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Notes</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>John</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jamie</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>Requires call</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div key="c" style={{border:'1px solid black', overflow:'hidden'}}>
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Notes</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>John</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jamie</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>Requires call</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
                <div key="d" style={{border:'1px solid silver', background:'white'}}>
                    <LineChart width={300} height={220} data={this.data}>
                        <Line type="monotone" dataKey="in" stroke="#8884d8" />
                        <Line type="monotone" dataKey="out" stroke="red" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="name" />
                        <YAxis />
                    </LineChart>
                </div>
                <div key="e" style={{border:'1px solid silver', background:'white'}}>
                    <ComposedChart width={300} height={220} data={this.data3}
                                   margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                        <XAxis dataKey="name"/>
                        <YAxis />
                        <Tooltip/>
                        <Legend/>
                        <CartesianGrid stroke='#f5f5f5'/>
                        <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
                        <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
                        <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
                    </ComposedChart>
                </div>
                <div key="f" style={{border:'1px solid silver', background:'white'}}>
                    <BarChart width={300} height={220} data={this.data2}
                              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <Tooltip/>
                        <Legend />
                        <Bar dataKey="pv" fill="#8884d8" />
                        <Bar dataKey="uv" fill="#82ca9d" />
                    </BarChart>
                </div>
                <div key="g" style={{border:'1px solid silver', overflow:'hidden'}}>
                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Status</Table.HeaderCell>
                                <Table.HeaderCell>Notes</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            <Table.Row>
                                <Table.Cell>John</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jamie</Table.Cell>
                                <Table.Cell>Approved</Table.Cell>
                                <Table.Cell textAlign='right'>Requires call</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell>Jill</Table.Cell>
                                <Table.Cell>Denied</Table.Cell>
                                <Table.Cell textAlign='right'>None</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </ReactGridLayout>

            {/*<ResponsiveReactGridLayout*/}
                {/*className="layout"*/}
                {/*cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}*/}
                {/*rowHeight={50}*/}
                {/*layouts={this.state.layouts}*/}
            {/*>*/}
                {/*<div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>*/}
                    {/*<span className="text">1</span>*/}
                {/*</div>*/}
                {/*<div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>*/}
                    {/*<span className="text">2</span>*/}
                {/*</div>*/}
                {/*<div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>*/}
                    {/*<span className="text">3</span>*/}
                {/*</div>*/}
                {/*<div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>*/}
                    {/*<span className="text">4</span>*/}
                {/*</div>*/}
                {/*<div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>*/}
                    {/*<span className="text">5</span>*/}
                {/*</div>*/}
            {/*</ResponsiveReactGridLayout>*/}

            <Dock position='left' dimMode='none' defaultSize={300} fluid={false} isVisible={this.state.isLeftDockVisible} dockStyle={{minWidth:'300px'}}>

                <Menu vertical attached inverted style={{width:"100%"}}>
                    <Menu.Item name='close'>
                        <Icon name='close' onClick={this.toggleSettings}/>
                        Settings
                    </Menu.Item>

                    <Menu.Menu>
                        <Menu.Item name='home' />
                        <Menu.Item name='messages'/>
                        <Menu.Item name='friends' />
                    </Menu.Menu>
                </Menu>
            </Dock>
        </div>
    }
}

const App = styled(_App)`
    height: 100%;
`;


ReactDOM.render( <App/>,  document.getElementById('app'));