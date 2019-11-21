import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  commentReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
