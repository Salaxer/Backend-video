const passport = require("passport");

const { BasicStrategy } = require("passport-http");
const boom = require("@hapi/boom");
const bcrypt = require("bcrypt");

const UsersServices = require("../../../services/users");

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    const userService = new UsersServices();
    try {
      const user = await userService.getUser({ email });
      if (!user) {
        return cb(boom.unauthorized(), false);
      }
      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }
      delete user.password;
      cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);
