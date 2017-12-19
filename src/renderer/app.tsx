import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {ThemeProvider} from "styled-components";
import * as _ from 'lodash'

import * as ReactGridLayout from 'react-grid-layout';

console.log('ReactGridLayout', ReactGridLayout)

var ResponsiveReactGridLayout = ReactGridLayout.Responsive;

import 'semantic-ui-css/semantic.css';
import {Dropdown, Container, Header, Menu, Item, Grid, Form, Segment, Button, Message, Image, Accordion, Icon} from "semantic-ui-react";
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
    items: any
    breakpoint?: any
    cols?: any
    newCounter: number
}


class App extends React.Component<{},AppState> {
    constructor(props) {
        super(props)
        this.state = {
            isLeftDockVisible: true,
            activeIndex: -1,
            items: [0, 1, 2, 3, 4].map(function(i, key, list) {
                return {
                    i: i.toString(),
                    x: i * 2,
                    y: 0,
                    w: 2,
                    h: 2
                };
            }),
            newCounter:0
        };

        this.toggleSettings = this.toggleSettings.bind(this);
    }

    onAddItem() {
        /*eslint no-console: 0*/
        console.log("adding", "n" + this.state.newCounter);
        this.setState({
            // Add a new item. It must have a unique key!
            items: this.state.items.concat({
                i: "n" + this.state.newCounter,
                x: (this.state.items.length * 2) % (this.state.cols || 12),
                y: Infinity, // puts it at the bottom
                w: 2,
                h: 2
            }),
            // Increment the counter to ensure key is always unique.
            newCounter: this.state.newCounter + 1
        });
    }


    createElement(el) {
        const removeStyle = {
            position: "absolute",
            right: "2px",
            top: 0,
            cursor: "pointer"
        };
        const i = el.add ? "+" : el.i;
        return (
            <div key={i} data-grid={el}>
                {el.add ? (
                    <span
                        className="add text"
                        onClick={this.onAddItem}
                        title="You can add an item by clicking here, too."
                    >
            Add +
          </span>
                ) : (
                    <span className="text">{i}</span>
                )}
                <span className="remove" style={removeStyle} onClick={this.onRemoveItem.bind(this, i)} >
          x
        </span>
            </div>
        );
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    onLayoutChange(layout) {
        this.setState({ layout: layout });
    }

    onBreakpointChange(breakpoint, cols) {
        this.setState({
            breakpoint: breakpoint,
            cols: cols
        });
    }

    onRemoveItem(i) {
        console.log("removing", i);
        this.setState({ items: _.reject(this.state.items, { i: i }) });
    }


    private toggleSettings() {
        console.log("isLeftDockVisible")
        this.setState({isLeftDockVisible: !this.state.isLeftDockVisible})
    }


    render() {
        const { activeIndex } = this.state

        return <div style={{height: '100%' }}>
            <Menu fixed='top' inverted>

                    <Menu.Item as='a' header>
                        <Icon name='settings' onClick={this.toggleSettings} />
                        Project Name
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

            {/*<ReactGridLayout style={{height: '100vh', top:'47px', position:'absolute' }} layout={this.layout} cols={4} rowHeight={300} width={1600}>*/}

                {/*<div key="a" style={{border:'1px solid black'}}>a</div>*/}
                {/*<div key="b" style={{border:'1px solid black'}}>b</div>*/}
                {/*<div key="c" style={{border:'1px solid black'}}>c</div>*/}
            {/*</ReactGridLayout>*/}

            <ResponsiveReactGridLayout
                style={{height: '100vh', top:'47px', position:'absolute' }}
                onLayoutChange={this.onLayoutChange}
                onBreakpointChange={this.onBreakpointChange}
                {...this.props}
            >
                {_.map(this.state.items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>

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


ReactDOM.render( <App/>,  document.getElementById('app'));