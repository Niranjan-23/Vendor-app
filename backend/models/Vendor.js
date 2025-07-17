const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: String,
    phone: String,
    password: String,
    shopName: String,
    qrURL: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }]
}, { timestamps: true });

module.exports = mongoose.model('Vendor', vendorSchema);
