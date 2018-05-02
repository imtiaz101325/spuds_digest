import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import store from "./store";

import Home from "./HomePage";
import Genre from "./GenrePage";
import Movie from "./MoviePage";
import WatchList from "./WatchListPage";
import Recent from "./RecentPage";

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/movies" />} />
        <Route exact path="/movies" component={Home} />
        <Route exact path="/movies/:genreID" component={Genre} />
        <Route exact path="/movies/:genreID/:movieID" component={Movie} />
        <Route exact path="/watchlist" component={WatchList} />
        <Route exact path="/recent" component={Recent} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
