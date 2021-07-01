const express = require('express');
const app = express();

const logRouter = require('./routes/log');
const activityRouter = require('./routes/activity');

const createError = require('./service/createError');

const cors = require('cors');
app.use(express.json());

app.use(cors());
app.use('/api/activity', activityRouter);
app.use('/api/log', logRouter);
app.use((req, res, next) => next(createError(404, 'Route not found')));

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || 'Oops, something went wrong');
});

module.exports = app;
