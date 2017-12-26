import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import appState from './appState';

const rootReducer = combineReducers({
    // counter,
    router,
});

export default rootReducer;