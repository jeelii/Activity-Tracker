const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');

const activitiesFilePath = path.join(__dirname, '../db/activities.json');

router.get('/', function (req, res, next) {
  const readable = fs.createReadStream(activitiesFilePath);
  readable.pipe(res);
});

module.exports = router;
