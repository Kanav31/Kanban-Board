const BoardItem = require('../models/boardItem');
const BoardColumn = require('../models/boardColumn');

const createItem = async (req, res) => {
  try {
    const newItem = await BoardItem.create(req.body);
    res.status(201).json({ message: 'Item created successfully', item: newItem });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const findAllItems = async (req, res) => {
//   try {
//     const columnId = req.params._id; 
//     const items = await BoardItem.find({ column: columnId }).populate('column');
//     res.json({ message: 'Fetched all items for the column', items });
//   } catch (error) {
//     console.error('Error fetching items:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const findAllItems = async (req, res) => {
  try {
    const boardId = req.params._id;

    // Assuming you have a BoardColumn model with a 'board' field referencing Board
    const columns = await BoardColumn.find({ board: boardId });

    if (!columns || columns.length === 0) {
      return res.status(404).json({ error: 'No columns found for the board' });
    }

    // Extracting column ids from the columns
    const columnIds = columns.map(column => column._id);

    // Fetching items for all columns within the board
    const items = await BoardItem.find({ column: { $in: columnIds } }).populate('column');

    res.json({ message: 'Fetched all items for the board', items });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const findItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await BoardItem.findById(itemId).populate('column');

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.status(200).json({ item });
  } catch (error) {
    console.error('Error fetching item by id:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItem = await BoardItem.findByIdAndUpdate(itemId, req.body, { new: true }).populate('column');

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: `Updated item with id ${itemId}`, item: updatedItem });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await BoardItem.findByIdAndDelete(itemId).populate('column');

    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: `Deleted item with id ${itemId}`, item: deletedItem });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createItem,
  findAllItems,
  findItemById,
  updateItem,
  deleteItem,
};