import {ActionType} from "../actions/appActions";

interface Portlet {
    id: string
    portletType: string
}

export type AppStateType = {
    activeTab: string
    portlrtList: Portlet[]
};

export default function counter(state: number = 0, action: {type:ActionType}) {
    switch (action.type) {
        case ActionType.CHANGE_TAB:
            return state + 1;
        case ActionType.CHANGE_TAB:
            return state - 1;
        default:
            return state;
    }
}