import { createActions, handleActions } from 'redux-actions';

import { diffDataSequence } from "./utils/api_utils";

const genreActionMap = {
  GENRE: {
    GET: {
      INIT: () => ({ status: "loading" }),
      DONE: genres => ({ status: "success", genres }),
      FAIL: message => ({ status: "failiur", message })
    }
  }
};

export const genreActions = createActions(genreActionMap);

export const defaultState = {
  status: "initial",
  data: [],
  message: ""
}

export const genreReducer = handleActions({
  [genreActions.genre.get.init]:(
    state,
    {
      payload: { status }
    }
  ) => ({
    ...state,
    status
  }),
  [genreActions.genre.get.done]:(
    state,
    {
      payload: { status, genres }
    }
  ) => ({
    ...state,
    status,
    data: diffDataSequence(state.data, genres)
  }),
  [genreActions.genre.get.fail]:(
    state,
    {
      payload: { status, message }
    }
  ) => ({
    ...state,
    status,
    message
  })
}, defaultState);

export const defaultEntityState = {}

export const genreEntityReducer = handleActions({
  [genreActions.genre.get.done]:(
    state,
    {
      payload: { genres }
    }
  ) => ({
    ...genres.reduce( (acc, curr) => ({
      ...acc,
      [curr.id]: curr
    }), state)
  })
}, defaultEntityState);


