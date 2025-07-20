const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');

const placeOrder = async(req, res)=>{

    const {vendorId, items, customerPhone, paymentType} = req.body;

    try{
        let totalAmount = 0;
        for(const item of items){
            const menuItem = await MenuItem.findById(item.item);
            if(!menuItem){
                return res.status(404).json({message : `Menu item not found : ${item.item}`});
            }
            totalAmount += menuItem.price * item.quantity;
        }

        const newOrder = new Order({
            vendor : vendorId,
            items,
            customerPhone,
            customerName: req.body.customerName || 'Anonymous',
            totalAmount,
            paymentType
        });

        await newOrder.save();
        req.io?.to(vendorId).emit("newOrder",newOrder);

        res.status(201).json({
            message: 'Order placed successfully',
            order: newOrder
        });
    } catch(error){
        res.status(500).json({
            message: 'Error placing order',
            error: error.message
        });
    }
};

module.exports= {placeOrder};