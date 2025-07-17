const jwt = require('jsonwebtoken');

const verifyVendor = (req, res, next) => {
    const authHeader = req.headers['authorization']; // lowercase
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token or invalid format' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.vendor = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyVendor;
