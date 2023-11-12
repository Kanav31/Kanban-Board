// boardModel.js
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Board = mongoose.model('Board', boardSchema);

module.exports = Board;
