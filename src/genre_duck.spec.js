import {
  genreActions,
  genreReducer,
  genreEntityReducer,
  defaultState,
  defaultEntityState
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
        name: "Action"
      },
      12: {
        id: 12,
        name: "Adventure"
      }
    });
  });
});
