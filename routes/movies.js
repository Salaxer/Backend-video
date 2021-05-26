const express = require("express");
const MoviesService = require("../services/movies");
const joi = require("@hapi/joi");

const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema,
} = require("../utils/schema/schemaMovie");

const validatioHandler = require("../utils/middleware/validationHandle");
const cacheResponse = require("../utils/cacheResponse");
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES } = require("../utils/time");

//JWT startegy
require("../utils/auth/strategies/jwt");

function moviesApi(app) {
  const router = express.Router();
  const movieServices = new MoviesService();
  app.use("/api/movies", router);

  // function get 1

  router.get("/", async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const { tags } = req.query;
    try {
      const movies = await movieServices.getMovies({ tags });
      res.status(200).json({
        data: movies,
        message: "movies listed",
      });
    } catch (err) {
      next(err);
    }
  });

  // funtion get 2 individual

  router.get(
    "/:movieId",
    validatioHandler(joi.object({ movieId: movieIdSchema }), "params"),
    async (req, res, next) => {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      const { movieId } = req.params;
      try {
        const movies = await movieServices.getMovie({ movieId });
        res.status(200).json({
          data: movies,
          message: "movies retrieved",
          response: movieId,
        });
      } catch (err) {
        next(err);
      }
    }
  );

  // funtion post 1, create movies

  router.post(
    "/",
    validatioHandler(createMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      try {
        const createMovieId = await movieServices.createMovie({ movie });
        res.status(201).json({
          data: createMovieId,
          message: "movies created",
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    "/:movieId",
    validatioHandler({ movieId: movieIdSchema }, "params"),
    validatioHandler(updateMovieSchema),
    async (req, res, next) => {
      const { body: movie } = req;
      const { movieId } = req.params;
      try {
        const updatedMovieId = await movieServices.updateMovie({
          movieId,
          movie,
        });
        res.status(200).json({
          data: updatedMovieId,
          message: "movies updated",
        });
      } catch (err) {
        next(err);
      }
    }
  );
  router.patch("/:movieId", async (req, res, next) => {
    const { body: movie } = req;
    const { movieId } = req.params;
    try {
      const modifyMovieId = await movieServices.updateMovie({
        movieId,
        movie,
      });
      res.status(200).json({
        data: modifyMovieId,
        message: "movies modify",
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    "/:movieId",
    validatioHandler({ movieId: movieIdSchema }, "params"),
    async (req, res, next) => {
      const { movieId } = req.params;
      try {
        const deletedMovieId = await movieServices.deleteMovie({ movieId });
        res.status(200).json({
          data: deletedMovieId,
          message: "movies deleted",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = moviesApi;
