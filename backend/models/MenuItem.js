const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name : String,
    price : Number,
    photoUrl : String,
    category : String,
    vendor : { type : mongoose.Schema.Types.ObjectId , ref : 'Vendor'}
});

module.exports = mongoose.model("MenuItem" , menuItemSchema);