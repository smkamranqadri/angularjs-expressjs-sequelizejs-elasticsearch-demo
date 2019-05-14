'use strict';

const express = require('express');

const { customers } = require('../controllers');

const router = express.Router();

router.get('/customers', customers.list);
router.post('/customers', customers.create);

module.exports = router;
