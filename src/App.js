import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import store from "./store";

import Home from "./HomePage";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
