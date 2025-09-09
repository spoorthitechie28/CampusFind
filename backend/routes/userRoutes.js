const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Public webhook endpoint for Clerk
router.post('/sync', userController.syncUser);

module.exports = router;
