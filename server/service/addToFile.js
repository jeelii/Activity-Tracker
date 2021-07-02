const fs = require('fs');
const createError = require('./createError');

const nextId = arr => (arr.length > 0
  ? arr[arr.length - 1].activity_id + 1
  : 1);

const addToFile = (file, data) => {
  const currentFileData = fs.readFileSync(file);
  try {
    const currentFileJson = JSON.parse(currentFileData);
    const newData = data;

    if (/activities\.json/.test(file)) {
      const activityId = nextId(currentFileJson);
      newData.activity_id = activityId;
    }

    newData.activity_id = Number(newData.activity_id);
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