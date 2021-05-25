const fs = require("fs");
const colors = require("./consolColor.json");

const out = fs.createWriteStream("./console/out.log");
const err = fs.createWriteStream("./console/out.log");

const print = new console.Console(out, err);

const verifyColor = (color) => {
  const isColor = Object.keys(colors).filter((co) => co === color);
  if (isColor.length > 0) {
    return true;
  }
  return false;
};

print.color = (color, msg = "") => {
  if (!color) {
    return console.log("Ingresa un color");
  }
  if (!verifyColor(color)) {
    return console.log("El color que ingresaste no es valido");
  }
  return console.log(`\x1b${colors[color]}`, msg);
};

module.exports = print;
