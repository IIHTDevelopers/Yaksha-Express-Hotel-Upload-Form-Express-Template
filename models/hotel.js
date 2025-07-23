const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema();  // Automatically adds createdAt and updatedAt fields

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;
