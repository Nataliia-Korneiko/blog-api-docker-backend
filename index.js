const express = require('express');
const mongoose = require('mongoose');
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require('./config/config');

const app = express();
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log('Successfully connected to DB'))
    .catch((error) => {
      console.log(error);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('<h2>Hi there!</h2>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
