const MongoLib = require("../lib/mongo");

class userMoviesService {
  constructor() {
    this.collection = "user-movies";
    this.mongoDB = new MongoLib();
  }
  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);
    return userMovies || [];
  }
  async createUserMovies({ userMovie }) {
    const createdUserMovieId = await this.mongoDB.create(
      this.collection,
      userMovie
    );
    return createdUserMovieId || [];
  }
  async deleteUserMovies({ userMovieId }) {
    const deleteUserMovieId = await this.mongoDB.delete(
      this.collection,
      userMovieId
    );
    return deleteUserMovieId || [];
  }
}

module.exports = userMoviesService;
