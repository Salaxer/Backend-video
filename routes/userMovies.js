const express = require("express");
const passport = require("passport");
const userMoviesService = require("../services/userMovies");

const validationHandler = require("../utils/middleware/validationHandle");
const scopesValidationHandler = require("../utils/middleware/scopesValidationHandler");

const { movieIdSchema } = require("../utils/schema/schemaMovie");
const { userIdSchema } = require("../utils/schema/users");
const { createUserMovieSchema } = require("../utils/schema/userMovies");

function userMoviesApi(app) {
  const router = express.Router();
  app.use("/api/user-movies", router);
  const UserMoviesServices = new userMoviesService();

  require("../utils/auth/strategies/jwt");
  router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler(["read:user-movies"]),
    validationHandler({ userId: userIdSchema }, "query"),
    async (req, res, next) => {
      const { userId } = req.query;
      try {
        const userMovies = await UserMoviesServices.getUserMovies({ userId });
        res.status(200).json({
          data: userMovies,
          message: "user movies listed",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler(["create:user-movies"]),
    validationHandler(createUserMovieSchema),
    async (req, res, next) => {
      const { body: userMovie } = req;
      try {
        const createUserMoviesId = await UserMoviesServices.createUserMovies({
          userMovie,
        });
        res.status(200).json({
          data: createUserMoviesId,
          message: "user movies created",
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.delete(
    "/",
    passport.authenticate("jwt", { session: false }),
    scopesValidationHandler(["delete:user-movies"]),
    validationHandler({ userMovieId: movieIdSchema }, "params"),
    async (req, res, next) => {
      const { userMovieId } = req.params;
      try {
        const deleteUserMoviesId = await UserMoviesServices.deleteUserMovies({
          userMovieId,
        });
        res.status(200).json({
          data: deleteUserMoviesId,
          message: "user movies deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userMoviesApi;
