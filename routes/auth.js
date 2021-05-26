const express = require("express");
const passport = require("passport");
const boom = require("@hapi/boom");
const jwt = require("jsonwebtoken");
const { config } = require("../config/index");
const ApiKeysService = require("../services/apiKey");
const UsersService = require("../services/users");
const validateHandler = require("../utils/middleware/validationHandle");

const { createUserSchema } = require("../utils/schema/users");

//Basic strategy
require("../utils/auth/strategies/basic");

function authApi(app) {
  const router = express.Router();
  app.use("/api/auth", router);

  const ApiKeysServices = new ApiKeysService();
  const usersService = new UsersService();

  router.post("/sign-in", async (req, res, next) => {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized("apiKeyToken is required"));
    }

    passport.authenticate("basic", (err, user) => {
      try {
        if (err || !user) {
          next(boom.unauthorized(""));
        }
        req.logIn(user, { session: false }, async (err) => {
          if (err) {
            next(err);
          }
          const apiKey = await ApiKeysServices.getApiKey({
            token: apiKeyToken,
          });
          if (!apiKey) {
            next(boom.unauthorized());
          }
          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email,
            scopes: apiKey.scopes,
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: "15m",
          });
          return res.status(200).json({ token, user: { id, name, email } });
        });
      } catch (err) {
        next(err);
      }
    })(req, res, next);
  });
  router.post(
    "/sign-up",
    validateHandler(createUserSchema),
    async (req, res, next) => {
      const { body: user } = req;
      try {
        const userExists = await usersService.getUser(user);
        if (userExists) {
          res.send({
            message: "user already exists",
          });
          return;
        }
        const createdUserID = await usersService.createUser({ user });
        res.status(201).json({
          data: createdUserID,
          message: "User created",
        });
      } catch (err) {
        next(err);
      }
    }
  );
}
module.exports = authApi;
