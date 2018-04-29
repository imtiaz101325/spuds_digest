import { handleActions, createActions } from "redux-actions";

import { genreActions } from "./genre_duck";
import { request, buildConfig } from "./api";

const movieActionMap = {
  MOVIE: {
    GET: {
      INIT: id => ({ status: "loading", id }),
      DONE: (id, movie) => ({ status: "success", id, movie }),
      FAIL: (id, message) => ({ status: "failiur", id, message })
    }
  }
};

export const movieActions = createActions(movieActionMap);

const defaultMovieState = {};

export const movieEntityReducer = handleActions(
  {
    [genreActions.genre.getMovie.done]: (state, { payload: { movies } }) => ({
      ...movies.reduce((acc, curr) => {
        if (!state[curr.id]) {
          return {
            ...acc,
            [curr.id]: {
              ...curr,
              meta: {
                byGenre: true,
                status: "initial",
                message: ""
              }
            }
          };
        }

        return {
          ...acc,
          [curr.id]: state[curr.id]
        };
      }, state)
    }),
    [movieActions.movie.get.init]: (state, { payload: { status, id } }) => ({
      ...state,
      [id]: !!state[id]
        ? {
            ...state[id],
            meta: {
              byGenre: false,
              status,
              message: ""
            }
          }
        : {
            meta: {
              byGenre: false,
              status,
              message: ""
            }
          }
    }),
    [movieActions.movie.get.done]: (
      state,
      { payload: { status, id, movie } }
    ) => ({
      ...state,
      [id]: {
        ...movie,
        meta: {
          byGenre: false,
          status,
          message: ""
        }
      }
    }),
    [movieActions.movie.get.done]: (
      state,
      { payload: { status, id, message } }
    ) => ({
      ...state,
      [id]: !!state[id]
        ? {
            ...state[id],
            meta: {
              byGenre: false,
              status,
              message
            }
          }
        : {
            meta: {
              byGenre: false,
              status,
              message
            }
          }
    })
  },
  defaultMovieState
);

export const getMovieById = id => async dispatch => {
  dispatch(movieActions.movie.get.init(id));

  let response = {};
  try {
    response = await request(`movie/${id}`, buildConfig());
    response.castCrew = await request(`movie/${id}/credits`, buildConfig());
    if (response.id) {
      dispatch(movieActions.movie.get.done(id, response));
      return response;
    }
  } catch (err) {
    dispatch(movieActions.movie.get.fail(err.status_message));
  }
};
