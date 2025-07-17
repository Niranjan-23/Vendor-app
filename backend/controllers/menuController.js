const MenuItem = require('../models/MenuItem');

const createMenuItem = async (req, res)=> {
    const {name , price , photoUrl , category} = req.body;
    
    const vendorId= req.vendor.id;
    try {
        const newItem = new MenuItem({
            name,
            price,
            photoUrl : photoUrl,
            category,
            vendor : vendorId
        });

        await newItem.save();
        res.status(201).json({
            message: "Menu item created successfully",
            item: newItem
        });
    } catch(error){
        res.status(500).json({ message: "Error creating menu item", error: error.message });
    }
};

const getMenuItems = async ( req,res) =>{
    try {
         const items = await MenuItem.find({ vendor: req.vendor.id });
         res.json(items);

    } catch(error){
        res.status(500).json({ message: " Error fetching menu items", error: error.message});
    }
};

const updateMenuItem = async (req, res) => {
    const { id} = req.params;
    const update = req.body;
    try {
        const item = await MenuItem.findOneAndUpdate(
            {_id : id, vendor: req.vendor.id},
            update,
            {new: true}
        );
        if(!item){
             return res.status(404).json({message: "menu item not found is not found in your menu"});
        }
        res.json({ message: "Item updated", item });
    } catch(error){
        res.status(500).json({ message: "Error updating menu item", error: error.message });
    }
};

const deleteMenuItem = async ( req,res ) => {
    const {id} = req.params;

    try{
        const item = await MenuItem.findOneAndDelete({ _id : id, vendor : req.vendor.id});
        if(!item)  return res.status(404).json({ message: "Menu item not found" }); 

        res.status(200).json({message: " MenuItem deleted successfully:"});
    } catch(error){
        res.status(500).json({ message: "Error deleting menu item", error: error.message });
    }
};

module.exports = { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem };
