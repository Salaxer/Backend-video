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

// app.get("/date/:year", (req, res) => {
//   let year = req.params.year;
//   res.send(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//         <meta charset="UTF-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Document</title>
//     </head>
//     <body>
//         ${
//           (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
//             ? "Año bisiesto"
//             : "No es año bisiesto"
//         }
//     </body>
//     </html>
//     `);
// });

app.listen(config.port, function () {
  console.log(`Listening http://localhost:${config.port}`);
});
