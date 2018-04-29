import { handleActions, createActions } from "redux-actions";
import jsonp from "jsonp";

import { getURL } from "./api";

const authActionMap = {
  AUTH: {
    GET_TOKEN: {
      INIT: () => ({ status: "loading" }),
      DONE: response => ({ status: "success", response }),
      FAIL: message => ({ status: "failiur", message })
    }
  }
};

export const authActions = createActions(authActionMap);

const defaultAuthState = {
  status: "initial",
  message: "",
  success: false,
  expires_at: "",
  request_token: ""
};

export const authReducer = handleActions(
  {
    [authActions.auth.getToken.init]: (state, { payload: { status } }) => ({
      ...state,
      status
    }),
    [authActions.auth.getToken.done]: (
      state,
      { payload: { status, response } }
    ) => ({
      ...state,
      status,
      ...response
    }),
    [authActions.auth.getToken.fail]: (
      state,
      { payload: { status, message } }
    ) => ({
      ...state,
      status,
      message
    })
  },
  defaultAuthState
);

export const getAuthToken = () => dispatch => {
  dispatch(authActions.auth.getToken.init());

  jsonp(getURL("authentication/token/new"), (err, data) => {
    if (err) {
      dispatch(authActions.auth.getToken.fail(err.status_messaage));
    }

    dispatch(authActions.auth.getToken.done(data));
  });
};

export const getSessionID = request_token => {
  window.localStorage.removeItem("sessionID");

  return new Promise((resolve, reject) => {
    jsonp(
      getURL("authentication/session/new", { request_token }),
      (err, data) => {
        if (err) {
          reject(err);
        }

        window.localStorage.setItem("sessionID", data.session_id);
        resolve(data);
      }
    );
  });
};
