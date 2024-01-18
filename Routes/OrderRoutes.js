const express = require('express');
const router = new express.Router();
const { addOrder, getOrdersByCustomerId, getOrders, getOrderById, updateOrderStatus } = require('../Controllers/OrderController');

router.post('/add', addOrder);
router.get('/get-by-user/:id', getOrdersByCustomerId);
router.get('/get-all', getOrders);
router.put('/update-order/:id', updateOrderStatus);
router.get('/get-order/:id', getOrderById);

module.exports = router;