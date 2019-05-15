'use strict';

const express = require('express');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const database = require('./config/database');
const elasticsearch = require('./config/elasticsearch');
const middleware = require('./config/middleware');
const utils = require('./config/utils');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT;

// third party middleware
middleware(app);

// root route
app.get('/api', function(req, res) {
  utils.responseHandler.successHanlder(res, 'Hello World!');
});

app.use('/api', routes);

try {
  // database connection
  database.sync().then(function() {
    console.log('Database synced!');
    // start listing to port
    app.listen(PORT, function(err) {
      if (err) {
        console.error(`Error while listing to port: ${PORT}: `, err);
      } else {
        console.log(`Server started successfully on port: ${PORT}`);
        // connecting elastic search
        elasticsearch
          .sync()
          .then(function() {
            console.log('Elasticsearch indexes synced!');
          })
          .catch(function(err) {
            console.log('Error whlie setting up elastic search', err);
          });
      }
    });
  });
} catch (err) {
  console.error('Error while starting server: ', err);
}
