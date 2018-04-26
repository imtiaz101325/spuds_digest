import { isLoading, diffDataSequence } from "./api_utils";

describe("API utilities", () => {
  it("should have a fuction to return true if status is loading", () => {
    expect(isLoading("loading")).toEqual(true);
  });

  describe("should have a fuction that takes previous data sequence and returns new data sequence where", () => {
    it("if there is new data it gets add", () => {
      expect(diffDataSequence([1, 2, 3], [{ id: 4 }, { id: 5 }, { id: 6 }])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    
    it("if there is no new data nothing changes", () => {
      expect(diffDataSequence([1, 2, 3], [{ id: 1 }, { id: 2 }, { id: 3 }])).toEqual([1, 2, 3]);
    });
  
    it("if there is some new data only those are added", () => {
      expect(diffDataSequence([1, 2, 3], [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 5 }])).toEqual([1, 2, 3, 4, 5]);
    });
  });
})