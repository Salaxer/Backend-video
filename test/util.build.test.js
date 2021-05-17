const assert = require("assert");

const buildMessage = require("../utils/buildMessage");

describe.only("utils - build message", () => {
  describe("when receives an entity and an action", () => {
    it("shoud return the respective message", () => {
      const result = buildMessage("movie", "create");
      const expect = "movie created";
      assert.strictEqual(result, expect);
    });
  });
  describe("when receives an entity and an action and is a list", () => {
    it("shoud return the respective message with the entity in plurar", () => {
      const result = buildMessage("movie", "list");
      const expect = "movies listed";
      assert.strictEqual(result, expect);
    });
  });
});
