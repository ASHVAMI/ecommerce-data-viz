const express = require('express');
const { getNewCustomersOverTime } = require('../controllers/customerController');
const router = express.Router();

router.get('/new-customers', getNewCustomersOverTime);

module.exports = router;
