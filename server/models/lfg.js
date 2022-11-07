const { Schema, model } = require('mongoose');

const lfgSchema = new Schema({
  creator: {
    type: String,
    required: "Creator necessary",
    default: " "
  },
  date: {
    type: Number,
    default: Date.now
  },
  title:{
    type: String,
    required: "Title necessary",
    default: "Title here"
  },
  players: [
    {
      type: String,
    },
  ],
  capacity: {
    type: Number,
    required: "Needs capacity",
    default: 1
  },
  playstyle:{
    type: String,
    required: "Needs playstyle",
    default: "Casual"
  }
});

const lfg = model('lfg', lfgSchema);

module.exports = lfg;
