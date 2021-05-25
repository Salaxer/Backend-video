const express = require("express");
const userMoviesService = require("../services/userMovies");

const validationHandler = require("../utils/middleware/validationHandle");

const { movieIdSchema } = require("../utils/schema/schemaMovie");
const { userIdSchema } = require("../utils/schema/users");
const { createUserMovieSchema } = require("../utils/schema/userMovies");

function userMoviesApi(app) {
  const router = express.Router();
  app.use("/api/user-movies", router);
  const UserMoviesServices = new userMoviesService();

  router.get(
    "/",
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
