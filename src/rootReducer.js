import { combineReducers } from "redux";

import { genreReducer, genreEntityReducer } from "./genre_duck";
import { movieEntityReducer } from "./movie_duck";

const reducer = combineReducers({
  genre: genreReducer,
  entities: combineReducers({
    genre: genreEntityReducer,
    movie: movieEntityReducer
  })
});

export default reducer;
