// boardRoutes.js
const express = require('express');
const { createBoard, findAllBoards, findBoardByName, updateBoard, deleteBoard } = require('../controllers/boardController');

const router = express.Router();

// Create a new board
router.post("/boards", createBoard);

// Retrieve all boards
router.get("/boards", findAllBoards);

// Retrieve a single board with id
router.get("/boards/:name", findBoardByName);

// Update a board with id
router.put("/boards/:id", updateBoard);

// Delete a board with id
router.delete("/boards/:id", deleteBoard);

module.exports = router;
