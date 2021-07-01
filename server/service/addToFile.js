const fs = require('fs');

const addToFile = (file, data) => {
  const currentFileData = fs.readFileSync(file);
  try {
    const currentFileJson = JSON.parse(currentFileData);
    const newData = data;
    currentFileJson.push(newData);
    const newFileData = JSON.stringify(currentFileJson, null, "\t");
    fs.writeFile(file, newFileData, (err) => {
      if (err) {
        throw createError(500, 'Error writing to file');
      }
    });
  } catch {
    throw createError(400, 'Bad json');
  }
}

module.exports = addToFile;