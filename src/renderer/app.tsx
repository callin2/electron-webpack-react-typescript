import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
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
    Link,
    Switch
} from 'react-router-dom'
import FirstPage from "./page/first";
import SecondPage from "./page/second";
import {createStore} from "redux";

import rootReducer from './reducer'

class App extends React.Component {
    private store: any;

    constructor(props) {
        super(props);

        this.store = createStore(rootReducer);
    }

    render() {
        return <Provider store={this.store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={FirstPage}/>
                    <Route exact path="/hello/" component={SecondPage}/>
                    <Route component={FirstPage}/>
                </Switch>
            </Router>
        </Provider>
    }
}

render( <App/>,  document.getElementById('app'));