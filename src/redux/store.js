import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import postReducer from "./postReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  postReducer,
  userReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
