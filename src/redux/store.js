import { createStore, applyMiddleware, combineReducers } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import commentReducer from "./commentReducer";
import musicReducer from "./musicReducer"

const rootReducer = combineReducers({
  postReducer,
  userReducer,
  commentReducer,
  musicReducer
});

export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
