const Order= require('../models/Order');
const MenuItem = require('../models/MenuItem');

const createOrder = async( req,res)=>{
    const {items , customerPhone , customerName , paymentType} = req.body;
    const vendorId = req.vendor.id;
    
    try{
        let totaLAmount = 0;
        for(const item of items){
            const menuItem = await MenuItem.findById(item.item)
            if(!menuItem){
                res.status(404).json({message: 'Menu item not found'});
            }

            totaLAmount += menuItem.price * item.quantity;
        } 
        const newOrder = new Order({
                vendor: vendorId,
                items:items,
                customerPhone,
                customerName,
                totalAmount  : totaLAmount,
                paymentType
            });

        await newOrder.save();  
        
        const io = req.app.get('io');
        io.to(vendorId).emit('newOrder', newOrder); 

        res.status(201).json({ message: 'Order created successfully', order: newOrder});         
    }catch(error){
        res.status(500).json({message: 'Error creating order', error: error.message});
    }
};

const getOrders = async (req,res)=> {
    const vendorId = req.vendor.id;
    try{
        const order = await Order.find({vendor:vendorId}).populate('items.item');
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message: 'Error fetching orders',error : error.message});
    }
};

const updateOrderStatus = async(req,res) => {
    const {id} = req.params;
    const {status} = req.body;

    try{
        const order = await Order.findByIdAndUpdate(
            { _id : id, vendor: req.vendor.id},
            {status},
            {new: true}
        );

        if(!order){
            return res.status(404).json({message: 'Order not found'});
        }
        res.json({ message: 'Order status updated successfully', order});
    }
    catch(error){
        res.status(500).json({message: ' Error updating order status', error: error.message});
    }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
