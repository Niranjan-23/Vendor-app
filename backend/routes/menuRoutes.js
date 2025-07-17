const express = require('express');
const router = express.Router();
const { createMenuItem, getMenuItems, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');

const verifyVendor = require('../middleware/authMiddleware');

router.use(verifyVendor);

router.post('/', createMenuItem);
router.get('/', getMenuItems);
router.put('/:id', updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;