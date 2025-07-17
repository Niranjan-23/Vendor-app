const Vendor = require('../models/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerVendor = async (req, res) => {
    const { name, phone ,password ,shopName} = req.body;

    try {
        const existing = await Vendor.findOne({phone});
        if (existing) {
            return res.status(400).json({ message: 'Vendor already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newVendor = new Vendor({
            name,
            phone,
            shopName,
            password: hashedPassword
        });
        await newVendor.save();
        const token = jwt.sign({ id: newVendor._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(201).json({ 
            message: "Vendor registered successfully",
            token,
            vendor: {
                id: newVendor._id,
                name: newVendor.name,
                phone: newVendor.phone,
                shopName: newVendor.shopName
            }
            });
    } catch (error) {
        res.status(500).json({ message: "Error registering vendor", error: error.message });
    }
};

const loginVendor = async (req, res) => {
    const { phone, password } = req.body;
    try{
        const exist = await Vendor.findOne({ phone});
        if(!exist) return res.status(400).json({message: "Vendor not found"});

        const hashedPassword = await bcrypt.compare(password, exist.password);
        if(!hashedPassword) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({ id: exist._id}, process.env.JWT_SECRET, { expiresIn: '7d' });
        
        res.json({
            token,
            vendor :{
                id: exist._id,
                name: exist.name,
                phone: exist.phone,
                shopName: exist.shopName
            }
        });
    }catch(error){
        res.status(500).json({message:"Login error" , error : error.message});
    }
};

module.exports = {registerVendor,loginVendor};