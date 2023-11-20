import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from "../reducers";
import thunk from "redux-thunk";

// Compose enhancers, including middleware
const composedEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(
  rootReducer,
  composedEnhancers
);

export default store;