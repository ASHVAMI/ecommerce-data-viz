const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  total_price_set: Number,
  created_at: Date,
  
});

module.exports = mongoose.model('Order', OrderSchema);
