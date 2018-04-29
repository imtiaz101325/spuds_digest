import { handleActions, createActions } from "redux-actions";

import { request, buildConfig } from "./api";

const accountActionMap = {
  ACCOUNT: {
    GET: {
      INIT: () => ({ status: "loading" }),
      DONE: response => ({ status: "success", response }),
      FAIL: message => ({ status: "failiur", message })
    },
    GET_WATCHLIST: {
      INIT: () => ({ status: "loading" }),
      DONE: response => ({ status: "success", response }),
      FAIL: message => ({ status: "failiur", message })
    }
  }
};

export const accountActions = createActions(accountActionMap);

const defaultAccountState = {
  account: {},
  watchlist: {}
};

export const accountReducer = handleActions(
  {
    [accountActions.account.get.init]: (state, { payload: { status } }) => ({
      ...state,
      account: {
        ...state.account,
        status
      }
    }),
    [accountActions.account.get.done]: (
      state,
      { payload: { status, response } }
    ) => ({
      ...state,
      account: {
        ...state.account,
        status,
        ...response
      }
    }),
    [accountActions.account.get.fail]: (
      state,
      { payload: { status, message } }
    ) => ({
      ...state,
      account: {
        ...state.account,
        status,
        message
      }
    }),
    [accountActions.account.getWatchlist.init]: (
      state,
      { payload: { status } }
    ) => ({
      ...state,
      watchlist: {
        ...state.watchlist,
        status
      }
    }),
    [accountActions.account.getWatchlist.done]: (
      state,
      { payload: { status, response } }
    ) => ({
      ...state,
      watchlist: {
        ...state.watchlist,
        status,
        ...response
      }
    }),
    [accountActions.account.getWatchlist.fail]: (
      state,
      { payload: { status, message } }
    ) => ({
      ...state,
      watchlist: {
        ...state.watchlist,
        status,
        message
      }
    })
  },
  defaultAccountState
);

export const getAccountDetails = () => async dispatch => {
  dispatch(accountActions.account.get.init());

  let response = {};
  try {
    response = await request("account", buildConfig(), {
      session_id: window.localStorage.getItem("sessionID")
    });
    if (response.id) {
      dispatch(accountActions.account.get.done(response));
    }
  } catch (err) {
    dispatch(accountActions.account.get.fail());
  }
};

export const getWatchlist = id => async dispatch => {
  dispatch(accountActions.account.getWatchlist.init());

  let response = {};
  try {
    response = await request(`account/${id}/watchlist/movies`, buildConfig(), {
      session_id: window.localStorage.getItem("sessionID")
    });
    if (response.page) {
      dispatch(accountActions.account.getWatchlist.done(response));
    }
  } catch (err) {
    dispatch(accountActions.account.getWatchlist.fail());
  }
};

export const addToWatchList = async (userID, movieID) =>
  await request(
    `account/${userID}/watchlist`,
    buildConfig(
      "POST",
      "cors",
      JSON.stringify({
        media_type: "movie",
        media_id: movieID,
        watchlist: true
      })
    ),
    { session_id: window.localStorage.getItem("sessionID") }
  );
