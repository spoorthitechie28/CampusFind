const express = require('express');
const router = express.Router();
const { protectWithSecret } = require('../middleware/authMiddleware');
const itemController = require('../controllers/itemController'); // This now imports the object of functions

// GET all items (public)
router.get('/', itemController.getAllItems);

// POST new item (protected by secret)
router.post('/', protectWithSecret, itemController.createItem);

// PUT update an item's status to "Claimed" (protected by secret)
router.put('/:id/claim', protectWithSecret, itemController.claimItem);

// DELETE an item (protected by secret)
router.delete('/:id', protectWithSecret, itemController.deleteItem);

module.exports = router;