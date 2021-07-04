'use strict';
const server = require('./src/server');
const mongoose = require('mongoose');

require('dotenv').config();
const port = process.env.PORT;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false,
}).then (() => {
  server.start(port);
}).catch (error => {
  console.error (error.message);
});
