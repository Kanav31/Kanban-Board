const Board = require('../models/board');

// Create a new board
const createBoard = async (req, res) => {
    try {
      const newBoard = await Board.create(req.body);
      return res.status(201).json({ 
        message: 'Board created successfully', 
        board: newBoard 
      });
    } catch (error) {
      console.error('Error creating board:', error);
      return res.status(500).json({ 
        error: 'Internal Server Error' 
      });
    }
  };

// Retrieve all boards
const findAllBoards = async (req, res) => {
    try {
      const boards = await Board.find();
      return res.json({ message: 'Fetched all boards', boards });
    } catch (error) {
      console.error('Error fetching boards:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

/// Retrieve a single board by Name
const findBoardByName = async (req, res) => {
  try {
    const boardName = req.params.name; // Assuming you pass the name in the request parameters
    const board = await Board.findOne({ name: boardName });

    if (!board) {
      throw new Error('Board not found');
    }

    res.status(200).json({ board });
  } catch (error) {
    console.error('Error fetching board by name:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a board by ID
const updateBoard = async (req, res) => {
    const boardId = req.params.id;
    try {
      const updatedBoard = await Board.findByIdAndUpdate(boardId, req.body, { new: true });
      if (!updatedBoard) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json({ message: `Updated board with ID ${boardId}`, board: updatedBoard });
    } catch (error) {
      console.error('Error updating board:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

// Delete a board by ID
const deleteBoard = async (req, res) => {
    const boardId = req.params.id;
    
    try {
      const deletedBoard = await Board.findByIdAndDelete(boardId);
      if (!deletedBoard) {
        return res.status(404).json({ error: 'Board not found' });
      }
      res.json({ message: `Deleted board with ID ${boardId}`, board: deletedBoard });
    } catch (error) {
      console.error('Error deleting board:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = {
  createBoard,
  findAllBoards,
  findBoardByName,
  updateBoard,
  deleteBoard,
};
