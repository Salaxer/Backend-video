const MongoLib = require("../lib/mongo");

class ApiKeysServices {
  constructor() {
    this.collection = "api-keys";
    this.mongoDB = new MongoLib();
  }
  async getApiKey({ token }) {
    const [apiKey] = await this.mongoDB.getAll(this.collection, { token });
  }
}
