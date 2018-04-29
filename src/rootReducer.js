import { combineReducers } from "redux";

import { genreReducer, genreEntityReducer } from "./genre_duck";
import { movieEntityReducer } from "./movie_duck";
import { authReducer } from "./auth_duck";
import { accountReducer } from "./account_duck";

const reducer = combineReducers({
  auth: authReducer,
  user: accountReducer,
  genre: genreReducer,
  entities: combineReducers({
    genre: genreEntityReducer,
    movie: movieEntityReducer
  })
});

export default reducer;
