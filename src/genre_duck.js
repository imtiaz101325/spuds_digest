import { createActions, handleActions } from "redux-actions";

import { diffDataSequence } from "./utils/api_utils";

import { buildConfig, request } from "./api";

const genreActionMap = {
  GENRE: {
    GET: {
      INIT: () => ({ status: "loading" }),
      DONE: genres => ({ status: "success", genres }),
      FAIL: message => ({ status: "failiur", message })
    },
    GET_MOVIE: {
      INIT: id => ({ status: "loading", id }),
      DONE: (id, movies) => ({ status: "success", id, movies }),
      FAIL: (id, message) => ({ status: "failiur", id, message })
    }
  }
};

export const genreActions = createActions(genreActionMap);

export const defaultState = {
  status: "initial",
  data: [],
  message: ""
};

export const genreReducer = handleActions(
  {
    [genreActions.genre.get.init]: (state, { payload: { status } }) => ({
      ...state,
      status,
      message: ""
    }),
    [genreActions.genre.get.done]: (
      state,
      { payload: { status, genres } }
    ) => ({
      ...state,
      status,
      data: diffDataSequence(state.data, genres)
    }),
    [genreActions.genre.get.fail]: (
      state,
      { payload: { status, message } }
    ) => ({
      ...state,
      status,
      message
    })
  },
  defaultState
);

export const defaultEntityState = {};

export const genreEntityReducer = handleActions(
  {
    [genreActions.genre.get.done]: (state, { payload: { genres } }) => ({
      ...genres.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.id]: {
            ...curr,
            movies: {
              status: "initial",
              data: [],
              message: ""
            }
          }
        }),
        state
      )
    }),
    [genreActions.genre.getMovie.init]: (
      state,
      { payload: { status, id } }
    ) => ({
      ...state,
      [id]: {
        ...state[id],
        movies: {
          ...state[id].movies,
          status,
          message: ""
        }
      }
    }),
    [genreActions.genre.getMovie.done]: (
      state,
      { payload: { status, id, movies } }
    ) => ({
      ...state,
      [id]: {
        ...state[id],
        movies: {
          ...state[id].movies,
          status,
          data: movies
        }
      }
    }),
    [genreActions.genre.getMovie.fail]: (
      state,
      { payload: { status, id, message } }
    ) => ({
      ...state,
      [id]: {
        ...state[id],
        movies: {
          ...state[id].movies,
          status,
          message
        }
      }
    })
  },
  defaultEntityState
);

export const getMoviesByGenre = id => async dispatch => {
  dispatch(genreActions.genre.getMovie.init(id));

  let response = [];
  try {
    response = await request("discover/movie", buildConfig(), {
      with_genres: id
    });
    if (response.results) {
      dispatch(genreActions.genre.getMovie.done(id, response.results));
    }
  } catch (err) {
    dispatch(genreActions.genre.getMovie.fail(id, err.status_message));
  }
};

export const getAllGenre = () => async dispatch => {
  dispatch(genreActions.genre.get.init());

  let response = [];
  try {
    response = await request("genre/movie/list", buildConfig());
    if (response.genres) {
      dispatch(genreActions.genre.get.done(response.genres));
    }
  } catch (err) {
    dispatch(genreActions.genre.get.fail(err.status_message));
  }
};
