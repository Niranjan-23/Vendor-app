const mongoose= require('mongoose');

const orderSchema = new mongoose.Schema({
    vendor : {type : mongoose.Schema.Types.ObjectId, ref : 'Vendor'},
    items : [{
        item :{type : mongoose.Schema.Types.ObjectId, ref : 'MenuItem'},
        quantity : Number
    }],
    customerPhone : {type : String, required : true},
    customerName : {type : String},
    totalAmount : {type : Number, required : true},   
    status : {type : String, enum :['pending' , 'preparing', 'ready', 'completed'] , default : 'pending'},
    paymentType : {type : String ,enum : ['cash' , 'upi'], default : 'cash'},
    createdAt : { type : Date ,default : Date.now}
});

module.exports = mongoose.model('Order' , orderSchema);