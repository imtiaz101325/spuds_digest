import { combineReducers } from "redux";

import { genreReducer, genreEntityReducer } from "./genre_duck";

const reducer = combineReducers({
  genre: genreReducer,
  entities: combineReducers({
    genre: genreEntityReducer
  })
});

export default reducer;
