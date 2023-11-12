const express = require('express');
const {
  createItem,
  findAllItems,
  findItemById,
  updateItem,
  deleteItem,
} = require('../controllers/boardItemController');

const router = express.Router();

// Create a new item
router.post("/items", createItem);

// Retrieve all items of a particular column
// router.get("/columns/:_id/items/", findAllItems);
router.get("/boards/:_id/items", findAllItems);

// Retrieve a single item with id
router.get("/items/:id", findItemById);

// Update an item with id
router.put("/items/:id", updateItem);

// Delete an item with id
router.delete("/items/:id", deleteItem);

module.exports = router;
