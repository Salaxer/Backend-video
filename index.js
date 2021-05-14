const express = require("express");
const app = express();
const { config } = require("./config/index");

const moviesApi = require("./routes/movies");

const {
  logErrors,
  errorHandler,
  wrapError,
} = require("./utils/middleware/errorHandles");

const notFoundHandler = require("./utils/middleware/notFoundHandler");

// body parser
app.use(express.json());
// routers
moviesApi(app);
// catch error 404
app.use(notFoundHandler);
// Errors midleware
app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
