var express = require('express');
var router = express.Router();
const createError = require('../service/createError');
const addToFile = require('../service/addToFile');

const fs = require('fs');

const path = require('path');
const logsFilePath = path.join(__dirname, '../db/log.json');

router.get('/', (req, res, next) => {
  const readable = fs.createReadStream(logsFilePath);
  readable.pipe(res);
});

router.post('/', (req, res, next) => {
  const data = addToFile(logsFilePath, req.body);
  res.status(201).end(data);
});

module.exports = router;
