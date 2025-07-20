const QRCode = require('qrcode');
const Vendor = require('../models/Vendor');

const generateQrCode = async(req,res)=>{
    try{
        const vendorId = req.vendor.id;
        const url = `https://yourdomain.com/shop/${vendorId}`;

        const qrImage = await QRCode.toDataURL(url);
        const vendor = await Vendor.findOneAndUpdate(
            { _id: vendorId },
            {qrURL :qrImage},
            {new : true}
        );

        res.json({
            message: 'Qr code generated and saved successfully',
            qrURL : vendor.qrURL,
            shopLink : url
        });
    }catch(error){
        res.json({
            message : 'Error generating QR code',
            error : error.message
        });
    }
};

module.exports = {generateQrCode};