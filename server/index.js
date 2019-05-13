'use strict';

const express = require('express');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const database = require('./config/database');
const middleware = require('./config/middleware');
const utils = require('./config/utils');

const app = express();
const PORT = process.env.PORT;

// third party middleware
middleware(app);

// root route
app.get('/api', (req, res) => {
  utils.responseHandler.successHanlder(res, 'Hello World!');
});

try {
  // database connection
  database.sync().then(function() {
    // start listing to port
    app.listen(PORT, function(err) {
      if (err) {
        console.error(`Error while listing to port: ${PORT}: `, err);
      } else {
        console.log(`Server started successfully on port: ${PORT}`);
      }
    });
  });
} catch (err) {
  console.error('Error while starting server: ', err);
}
