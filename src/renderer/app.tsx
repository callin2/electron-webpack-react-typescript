import * as React from 'react';
import {render} from 'react-dom';
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

import ThirdPage from "./page/third";
import {TestPage} from "./page/testpage";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Router>
            <Switch>
                <Route exact path="/" component={FirstPage}/>
                <Route exact path="/hello/" component={SecondPage}/>
                <Route exact path="/3/" component={ThirdPage}/>
                {/*<Route component={TestPage}/>*/}
                <Route component={ThirdPage}/>
            </Switch>
        </Router>

    }
}

render( <App/>,  document.getElementById('app'));