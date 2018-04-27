import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import {
  genreActions,
  genreReducer,
  genreEntityReducer,
  defaultState,
  defaultEntityState,
  getAllGenre
} from "./genre_duck";

describe("Genre actions", () => {
  it("should return loading status on init", () => {
    expect(genreActions.genre.get.init()).toEqual({
      type: "GENRE/GET/INIT",
      payload: {
        status: "loading"
      }
    });
  });

  it("should return data with success status on done", () => {
    const genres = [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      }
    ];

    expect(genreActions.genre.get.done(genres)).toEqual({
      type: "GENRE/GET/DONE",
      payload: {
        status: "success",
        genres
      }
    });
  });

  it("should return faliur status on fail", () => {
    expect(genreActions.genre.get.fail("it didn't work")).toEqual({
      type: "GENRE/GET/FAIL",
      payload: {
        status: "failiur",
        message: "it didn't work"
      }
    });
  });
});

describe("Genre reducer", () => {
  it("should return the initial state", () => {
    expect(genreReducer(undefined, {})).toEqual(defaultState);
  });

  it("should handle GENRE/GET/INIT", () => {
    expect(genreReducer(defaultState, genreActions.genre.get.init())).toEqual({
      status: "loading",
      data: [],
      message: ""
    });
  });

  it("should handle GENRE/GET/DONE", () => {
    expect(
      genreReducer(
        defaultState,
        genreActions.genre.get.done([{ id: 1 }, { id: 2 }, { id: 3 }])
      )
    ).toEqual({
      status: "success",
      data: [1, 2, 3],
      message: ""
    });
  });

  it("should handle GENRE/GET/FAIL", () => {
    expect(
      genreReducer(defaultState, genreActions.genre.get.fail("it didn't work"))
    ).toEqual({
      status: "failiur",
      data: [],
      message: "it didn't work"
    });
  });
});

describe("Genre enitiy reducer", () => {
  it("should return the initial state", () => {
    expect(genreEntityReducer(undefined, {})).toEqual(defaultEntityState);
  });

  it("should handle GENRE/GET/DONE", () => {
    const genres = [
      {
        id: 28,
        name: "Action"
      },
      {
        id: 12,
        name: "Adventure"
      }
    ];

    expect(
      genreEntityReducer(
        defaultEntityState,
        genreActions.genre.get.done(genres)
      )
    ).toEqual({
      28: {
        id: 28,
        name: "Action",
        movies: {
          status: "initial",
          data: [],
          message: ""
        }
      },
      12: {
        id: 12,
        name: "Adventure",
        movies: {
          status: "initial",
          data: [],
          message: ""
        }
      }
    });
  });
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Genre thunks", () => {
  describe("Get all genre thunk", () => {
    it("fetches a list of all genres", () => {
      fetch.mockResponse(
        JSON.stringify({
          genres: [
            {
              id: 28,
              name: "Action"
            }
          ]
        })
      );

      const expectedActions = [
        genreActions.genre.get.init(),
        genreActions.genre.get.done([
          {
            id: 28,
            name: "Action"
          }
        ])
      ];

      const store = mockStore({});

      return store.dispatch(getAllGenre()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  it("fails to fetche a list of all genres", () => {
    fetch.mockReject(
      JSON.stringify({
        status_message: "The resource you requested could not be found.",
        status_code: 34
      })
    );

    const expectedActions = [
      genreActions.genre.get.init(),
      genreActions.genre.get.fail(
        "The resource you requested could not be found."
      )
    ];

    const store = mockStore({});

    return store.dispatch(getAllGenre()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
