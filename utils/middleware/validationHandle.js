const boom = require("@hapi/boom");
const joi = require("@hapi/joi");

function validate(data, schema) {
  const { error } = schema.validate(data, { errors: { stack: true } });
  return error;
}

function validateHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error)) : next();
  };
}

module.exports = validateHandler;
