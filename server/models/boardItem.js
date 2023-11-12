// itemModel.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: String,
    dueDate: Date,
    column: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Column',
    },
  },
  { timestamps: true }
);

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
