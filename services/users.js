const MongoLib = require("../lib/mongo");
const bcrypt = require("bcrypt");

class usersServices {
  constructor() {
    this.collections = "users";
    this.mongoDB = new MongoLib();
  }
  async getUser({ email }) {
    const [user] = await this.mongoDB.getAll(this.collections, { email });
    return user;
  }
  async createUser({ user }) {
    const { name, email, password } = user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUserId = await this.mongoDB.create(this.collections, {
      name,
      email,
      password: hashedPassword,
    });
    return this.createUserId;
  }
}

module.exports = usersServices;
