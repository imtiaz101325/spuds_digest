import { buildConfig, request } from "./api";

describe("API helpers", () => {
  describe("Build cofiguration helper", () => {
    it("returns default configureation with GET method", () => {
      expect(buildConfig()).toEqual({
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        method: "GET",
        mode: "cors"
      });
    });

    it("returns configuration for POST request on pasing the method in its parameter", () => {
      expect(buildConfig("POST")).toEqual({
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8"
        }),
        method: "POST",
        mode: "cors"
      });
    });
  });

  describe("API request helper", () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("can handle basic requests", () => {
      fetch.mockResponseOnce(JSON.stringify({ data: "12345" }));

      //assert on the response
      request("").then(res => {
        expect(res.data).toEqual("12345");
      });

      //assert on the times called and arguments given to fetch
      expect(fetch.mock.calls.length).toEqual(1);
      expect(fetch.mock.calls[0][0]).toEqual(
        "https://api.themoviedb.org/3/?api_key=cd890f94a756b1518a2a17617a5b430e"
      );
    });
  });
});
