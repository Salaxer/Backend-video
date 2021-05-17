const assert = require("assert");
const proxyquire = require("proxyquire");

const { moviesMock, MoviesServiesMock } = require("../utils/mocks/movie");
const testServer = require("../utils/testServer");

describe("routes - movies", () => {
  const route = proxyquire("../routes/movies", {
    "../services/movies": MoviesServiesMock,
  });
  const request = testServer(route);

  describe("GET /movies", function () {
    it("shoud respond with statis 200", (done) => {
      request.get("/api/movies").expect(200, done);
    });
    it("should respond with the list of movies", (done) => {
      request.get("/api/movies").end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: "movies listed",
        });
        done();
      });
    });
  });
});
