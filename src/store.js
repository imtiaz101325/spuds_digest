import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

import reducer from "./rootReducer";

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  offline(offlineConfig)
);

export default createStore(reducer, /* preloadedState, */ enhancer);
