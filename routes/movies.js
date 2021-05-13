const express = require("express");
const MoviesService = require("../services/movies");

function moviesApi(app) {
  const router = express.Router();
  const movieServices = new MoviesService();

  app.use("/api/movies", router);

  router.get("/", async (req, res, next) => {
    const { tags } = req.query;
    try {
      const movies = await movieServices.getMovies({ tags });
      throw new Error("error getting movies ");
      res.status(200).json({
        data: movies,
        message: "movies listed",
      });
    } catch (err) {
      next(err);
    }
  });

  router.get("/:movieId", async (req, res, next) => {
    const { movieId } = req.params;
    try {
      const movies = await movieServices.getMovie({ movieId });
      res.status(200).json({
        data: movies,
        message: "movies retrieved",
      });
    } catch (err) {
      next(err);
    }
  });

  router.post("/", async (req, res, next) => {
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
  });

  router.put("/:movieId", async (req, res, next) => {
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
  });
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

  router.delete("/:movieId", async (req, res, next) => {
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
  });
}

module.exports = moviesApi;
