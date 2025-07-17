const express = require('express');
const router = express.Router();
const { createOrder, getOrders, updateOrderStatus } = require('../controllers/orderController');
const verifyVendor = require('../middleware/authMiddleware');

router.use(verifyVendor);

router.post('/', createOrder);
router.get('/',getOrders);
router.put('/:id', updateOrderStatus);

module.exports = router;