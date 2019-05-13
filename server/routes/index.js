'use strict';

const express = require('express');

const controllers = require('../controllers');

const router = express.Router();

router.get('/customers', controllers.customers.getAll);

module.exports = router;
