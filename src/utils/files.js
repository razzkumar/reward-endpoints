const fs = require("fs");
const path = require("path");

// Root dir of the project
const filePath = path.join(__dirname, "../../data.json");

/**
 * Function that helps to read data from default file path
 */
async function readJsonFile() {
  // create file if not exist
  if (!fs.existsSync(filePath)) {
    console.info(`[FILE UTILS] Creating file`);
    fs.writeFileSync(filePath, "[]");
  }

  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      if (data) {
        resolve(JSON.parse(data));
      }
      resolve({});
    });
  });
}

/**
 * Function that helps to write data from default file path
 * @param {string} data - Formated json data to store on json file.
 */

async function writeJsonFile(data) {
  // create file if not exist
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}

module.exports = {
  readJsonFile,
  writeJsonFile,
};
