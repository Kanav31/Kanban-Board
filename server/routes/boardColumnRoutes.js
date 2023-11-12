const express = require('express');
const {
  createColumn,
  findAllColumns,
  findColumnById,
  updateColumn,
  deleteColumn,
} = require('../controllers/boardColumnController');

const router = express.Router();

// Create a new column
router.post("/columns", createColumn);

// Retrieve all columns of a particular board
router.get("/boards/:_id/columns/", findAllColumns);

// Retrieve a single column with id
router.get("/columns/:id", findColumnById);

// Update a column with id
router.put("/columns/:id", updateColumn);

// Delete a column with id
router.delete("/columns/:id", deleteColumn);

module.exports = router;
