const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum : ['To Do', 'In Progress', 'Completed']
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board',
    },
  },
  { timestamps: true }
);

const Column = mongoose.model('Column', columnSchema);

module.exports = Column;
