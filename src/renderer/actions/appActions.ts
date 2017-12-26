export enum ActionType {
    CHANGE_TAB,
    ADD_PORTLET,
    REMOVE_PORTLET,
    MOVE_PORTLET,
    OPEN_LEFT_SLIDER,
    CLOSE_LEFT_SLIDER
}


export default ({
    changeTab: (tabInfo)=>{
        return {type: ActionType.CHANGE_TAB, tabInfo}
    },

    addPortlet: (portletInfo)=>{
        return {type: ActionType.ADD_PORTLET, portletInfo}
    },

    removePortlet: (portletInfo)=>{
        return {type: ActionType.REMOVE_PORTLET, portletInfo}
    },

    openLeftSlider: ()=>{
        return {type:ActionType.OPEN_LEFT_SLIDER}
    },

    closeLeftSlider: ()=>{
        return {type:ActionType.CLOSE_LEFT_SLIDER}
    }
});
