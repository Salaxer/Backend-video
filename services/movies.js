const { moviesMock } = require("../utils/mocks/movie");

class MoviesService {
  async getMovies() {
    const movies = await Promise.resolve(moviesMock);
    return movies || [];
  }
  async getMovie() {
    const movie = await Promise.resolve(moviesMock[0]);
    return movie || {};
  }
  async createMovie() {
    const createMovieId = await Promise.resolve(moviesMock[0].id);
    return createMovieId || [];
  }
  async updateMovie() {
    const updateMovieId = await Promise.resolve(moviesMock[0].id);
    return updateMovieId || [];
  }
  async ModifyMovie() {
    const modifyMovieId = await Promise.resolve(moviesMock[0].id);
    return modifyMovieId || [];
  }
  async deleteMovie() {
    const deleteMovieId = await Promise.resolve(moviesMock[0].id);
    return deleteMovieId || [];
  }
}

module.exports = MoviesService;
