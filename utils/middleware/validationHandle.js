const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

const validate = function (data, schema) {
  const { error } = new joi.ValidationError(data, schema);
  return error;
};

function validateHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validateHandler;
