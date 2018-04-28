import { handleActions } from "redux-actions";

import { genreActions } from "./genre_duck";

const defaultMovieState = {};

export const movieEntityReducer = handleActions(
  {
    [genreActions.genre.getMovie.done]: (state, { payload: { movies } }) => ({
      ...movies.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: curr
        }),
        state
      )
    })
  },
  defaultMovieState
);
