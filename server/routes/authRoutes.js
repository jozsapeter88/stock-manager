const express = require('express');
const router = express.Router();

// Import the required controllers or middleware
const { registerUser, loginUser } = require('../controllers/authController');

// Define the authentication routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
