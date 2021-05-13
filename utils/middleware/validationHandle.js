function validate() {
  return false;
}

function validateHandler(schema, check = "body") {
  return function (req, res, next) {
    const error = validate(req[check], schema);
    error ? new Error(error) : next();
  };
}

module.exports = validateHandler;
