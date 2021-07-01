const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const addToFile = require('../service/addToFile');

const activitiesFilePath = path.join(__dirname, '../db/activities.json');
const categoriesFilePath = path.join(__dirname, '../db/categories.json');

router.get('/', function (req, res, next) {
  const readable = fs.createReadStream(activitiesFilePath);
  readable.pipe(res);
});

router.get('/category/', (req, res, next) => {
  const readable = fs.createReadStream(categoriesFilePath);
  readable.pipe(res);
});

router.post('/', (req, res, next) => {
  addToFile(activitiesFilePath, req.body);
  res.status(201).end();
});

module.exports = router;
