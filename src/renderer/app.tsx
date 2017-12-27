import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, BarChart, Tooltip, Legend, Bar, ComposedChart, Area} from 'recharts';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'


import 'semantic-ui-css/semantic.css';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import FirstPage from "./page/first";
import SecondPage from "./page/second";
import {M as CS} from './store/configureStore';
import ThirdPage from "./page/third";

class App extends React.Component {
    private store: any;

    constructor(props) {
        super(props);

        this.store = CS.configureStore();
    }

    render() {
        return <Provider store={this.store}>
            <Router>
                <Switch>
                    <Route exact path="/" component={FirstPage}/>
                    <Route exact path="/hello/" component={SecondPage}/>
                    <Route exact path="/3/" component={ThirdPage}/>
                    <Route component={ThirdPage}/>
                </Switch>
            </Router>
        </Provider>
    }
}

render( <App/>,  document.getElementById('app'));