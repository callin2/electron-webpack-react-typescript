import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled, {ThemeProvider} from "styled-components";

import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar, ComposedChart, Area} from 'recharts';

import * as ReactGridLayout from 'react-grid-layout';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

console.log('ReactGridLayout', ReactGridLayout)

import 'semantic-ui-css/semantic.css';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'
import FirstPage from "./page/first";
import SecondPage from "./page/second";


class App extends React.Component {
    constructor(props) {
        super(props)

    }


    render() {
        return <Router>
            <div>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                </ul>

                <hr/>

                <Route exact path="/" component={FirstPage}/>
                <Route exact path="/hello/" component={SecondPage}/>

            </div>
        </Router>
    }
}

ReactDOM.render( <App/>,  document.getElementById('app'));