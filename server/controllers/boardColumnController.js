const BoardColumn = require('../models/boardColumn');

const createColumn = async (req, res) => {
  try {
    const newColumn = await BoardColumn.create(req.body);
    res.status(201).json({ message: 'Column created successfully', column: newColumn });
  } catch (error) {
    console.error('Error creating column:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findAllColumns = async (req, res) => {
  try {
    const boardId = req.params._id;
    const columns = await BoardColumn.find({ board: boardId });
    res.json({ message: 'Fetched all columns for the board', columns });
  } catch (error) {
    console.error('Error fetching columns:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const findColumnById = async (req, res) => {
  try {
    const columnId = req.params.id;
    const column = await BoardColumn.findById(columnId);

    if (!column) {
      return res.status(404).json({ error: 'Column not found' });
    }

    res.status(200).json({ column });
  } catch (error) {
    console.error('Error fetching column by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateColumn = async (req, res) => {
  try {
    const columnId = req.params.id;
    const updatedColumn = await BoardColumn.findByIdAndUpdate(columnId, req.body, { new: true });

    if (!updatedColumn) {
      return res.status(404).json({ error: 'Column not found' });
    }

    res.json({ message: `Updated column with id ${columnId}`, column: updatedColumn });
  } catch (error) {
    console.error('Error updating column:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteColumn = async (req, res) => {
  try {
    const columnId = req.params.id;
    const deletedColumn = await BoardColumn.findByIdAndDelete(columnId);

    if (!deletedColumn) {
      return res.status(404).json({ error: 'Column not found' });
    }

    res.json({ message: `Deleted column with id ${columnId}`, column: deletedColumn });
  } catch (error) {
    console.error('Error deleting column:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createColumn,
  findAllColumns,
  findColumnById,
  updateColumn,
  deleteColumn,
};