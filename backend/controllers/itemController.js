const Item = require('../models/Item');

// @desc    Create a new item
// @route   POST /api/items
// @access  Private (called by Convex)
const createItem = async (req, res) => {
  try {
    const { clerkUserId, type, itemName, category, description, location, imageUrl } = req.body;

    if (!clerkUserId || !type || !itemName || !category) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newItem = new Item({
      clerkUserId,
      type,
      itemName,
      category,
      description,
      location,
      imageUrl,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ message: 'Server error while creating item.' });
  }
};

// @desc    Get all items
// @route   GET /api/items
// @access  Public
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 }); // Get newest items first
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: 'Server error while fetching items.' });
  }
};

// @desc    Update an item's status to "Claimed"
// @route   PUT /api/items/:id/claim
// @access  Private (called by Convex)
const claimItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    item.status = 'Claimed';
    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error('Error claiming item:', error);
    res.status(500).json({ message: 'Server error while claiming item.' });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (called by Convex)
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item not found.' });
    }

    await item.deleteOne(); // Use deleteOne() on the document instance
    res.status(200).json({ message: 'Item removed successfully.' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ message: 'Server error while deleting item.' });
  }
};


// --- THIS IS THE IMPORTANT PART ---
// We now export all functions in a single object
module.exports = {
  createItem,
  getAllItems,
  claimItem,
  deleteItem,
};