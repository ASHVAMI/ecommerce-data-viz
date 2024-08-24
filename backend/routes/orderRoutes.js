const express = require('express');
const { getTotalSalesOverTime } = require('../controllers/orderController');
const router = express.Router();

router.get('/total-sales', getTotalSalesOverTime);

module.exports = router;
