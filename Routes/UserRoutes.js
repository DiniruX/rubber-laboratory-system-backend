const express = require('express');
const router = new express.Router();
const { registerUser, userLogin, getUsers, getUserById, updateUser } = require('../Controllers/UserController');

router.post('/register', registerUser);
router.post('/login', userLogin);
router.get('/get-all', getUsers);
router.get('/get-by-id/:id', getUserById);
router.put('/update/:id', updateUser);

module.exports = router;