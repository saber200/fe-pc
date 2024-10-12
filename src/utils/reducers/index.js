export const initialState = {
  gridData: {},
  layouts: []
};

export function initState(state = initialState, action) {
  const { type, gridData } = action;
  if(type === 'initPageConfig'){
    return {
      initialState,
      ...newState
    }
  }

  if(type === 'changeLayouts'){
    return {
      ...state,
      layouts: action.layouts
    }
  }

  if (type === 'changeDataFrid') {
    return {
      ...state,
      gridData
    }
  }

  if(type === 'setBuildPageId') {
    return {
      ...state,
      buildPageId: action.buildPageId
    }
  }

  if(type === 'changeConfig') {
    const { editOptionName } = action;
    
    return {
      ...state,
      editComp: { ...action.config },
      editOptionName
    }
  }

  if(type === 'saveConfig') {
    const { state } = action;
    return state;
  }
  
  return state
}

import { Actions } from "../actions/index";

let defaultUser = { realm: "null" };
let defaultApp = null;
let defaultEditApp = null;

export const currentUser = (state = defaultUser, action) => {
  console.log(1)
  if (action.type == Actions.updateUser) {
    return action.data;
  }
  return state;
};

export const currentApp = (state = defaultApp, action) => {
  console.log(2)
  if (action.type == Actions.updateApp) {
    return action.data;
  }
  return state;
};

export const editApp = (state = defaultEditApp, action) => {
  console.log(3)
  if (action.type == Actions.updateEditApp) {
    return action.data;
  }
  return state;
};
