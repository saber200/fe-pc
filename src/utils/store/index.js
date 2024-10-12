import { createStore, combineReducers } from "redux";
import { currentUser, currentApp, editApp } from "../reducers/index";

const root = combineReducers({ currentUser, currentApp, editApp });

const store = createStore({ ...rootReducer, root })

export default store;
