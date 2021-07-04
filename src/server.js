'use strict';

const express = require ('express');
// const mongoose = require ('mongoose');

const router = require ('./auth/router');

const notFoundHandler = require ('./auth/middleware/404');
const errorHandler = require ('./auth/middleware/500');

const cors = require ('cors');

const app = express();
app.use (cors());

app.use (express.json());

app.use(router);

app.use (express.urlencoded({extended : true}));
app.get('/', (req, res) => {
  res.status(200).send ('Hello From Sukina Class 6 !');
});
app.use ('*', notFoundHandler);
app.use (errorHandler);

function start (port){
  app.listen(port, () => {
    console.log (`App is listening on the port ${port}`);
  });
}

module.exports = {
  app : app,
  start : start,  
};
