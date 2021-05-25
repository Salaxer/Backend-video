const joi = require("@hapi/joi");

const { movieIdSchema } = require("./schemaMovie");
const { userIDSchema } = require("./users");

const userMovieIdSchema = joi.string().regex(/^[0-9a-fA-F{24}]/);
const createUserMovieSchema = {
  userId: userIDSchema,
  movieId: movieIdSchema,
};

module.exports = {
  userMovieIdSchema,
  createUserMovieSchema,
};
