//applyMiddleware：使redux兼容异步的中间件  combineReducers：使redux兼容多个状态存储


import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import { popupsStatus } from "./reducer";

//使用redux开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'

const allR = combineReducers({popupsStatus})

export default createStore(allR,composeWithDevTools(applyMiddleware(thunk)))