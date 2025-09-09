const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protectWithSecret } = require('../middleware/secretMiddleware');
const Item = require('../models/Item'); // your mongoose model

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST new item (protected by secret)
router.post('/', protectWithSecret, upload.single('image'), async (req, res) => {
  try {
    const { type, itemName, category, description, location } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newItem = new Item({
      type,
      itemName,
      category,
      description,
      location,
      image: imagePath
    });

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create item' });
  }
});

module.exports = router;
