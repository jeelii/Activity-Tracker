const fs = require('fs');

const addToFile = (file, data) => {
  const currentFileData = fs.readFileSync(file);
  const currentFileJson = JSON.parse(currentFileData);
  const newData = data;
  currentFileJson.push(newData);
  const newFileData = JSON.stringify(currentFileJson);
  fs.writeFile(file, newFileData, (err) => {
    if (err) {
      throw createError(500, 'Error writing to file');
    }
  });
}

module.exports = addToFile;