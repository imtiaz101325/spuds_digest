import { handleActions, createActions } from "redux-actions";

import { movieActions } from "./movie_duck";

const accountActionMap = {
  ACCOUNT: {
    WATCHLIST: {
      ADD: id => ({ id }),
      REMOVE: id => ({ id })
    }
  }
};

export const accountActions = createActions(accountActionMap);

const defaultAccountState = {
  watchlist: [],
  visited: []
};

export const accountReducer = handleActions(
  {
    [accountActions.account.watchlist.add]: (state, { payload: { id } }) => {
      if (state.watchlist.indexOf(id) === -1) {
        return {
          ...state,
          watchlist: [...state.watchlist, id]
        };
      }

      return state;
    },
    [accountActions.account.watchlist.remove]: (
      state,
      { payload: { id } }
    ) => ({
      ...state,
      watchlist: state.watchlist.filter(inState => id !== inState)
    }),
    [movieActions.movie.visited]: (state, { payload: { id } }) => ({
      ...state,
      visited: [id, ...state.visited.filter(inList => id !== inList)].slice(
        0,
        10
      )
    })
  },
  defaultAccountState
);
