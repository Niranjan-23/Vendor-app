const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const verifyVendor = require('../middleware/authMiddleware');
const { generateQrCode } = require('../controllers/qrController');

router.get('/dashboard', verifyVendor, (req,res) =>{
    res.json({
        message : `Welcome vendor id : ${req.vendor.id}`
    });
});

router.put('/profile' , verifyVendor, async(req,res)=>{
    try{
        const update = await Vendor.findOneAndUpdate(
          { _id: req.vendor.id },      // ✅ Correct: pass filter as an object
          req.body,
          { new: true }
        );
        res.json({message : 'Profile updates successfully', vendor: update});
    }catch(error){
        res.status(500).json({message: 'Error editing profile', error: error.message});
    }
});

router.get('/shop/:vendorId', async(req,res)=>{
    try{
        const vendor = await Vendor.findById(req.params.vendorId).populate('menu');
        if(!vendor){
            return res.status(404).json({message: 'Vendor not found'});
        }

        res.json({
            name:vendor.name,
            shopName: vendor.shopName,
            qrUrl : vendor.qrURl,
            menu : vendor.menu
        });
    }catch(error){
        res.status(500).json({message: 'Error fetching vendor details', error: error.message});
    }
});

router.post('/generate-qr', verifyVendor, generateQrCode);
module.exports = router;    