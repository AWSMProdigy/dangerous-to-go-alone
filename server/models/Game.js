const { Schema, model } = require('mongoose');
const { User } = require('./User');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema({
  title: {
    type: String,
    required: 'Game needs a title',
    minlength: 1,
    maxlength: 280,
    unique: true
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: {
    type: String
  },
  players: [
    {
      type: String
    }
  ],
  src: {
    type: String
  },
  platforms: {
    type: String
  },
  lfgList: [
    {
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
    }
  ]
});

const Game = model('Game', gameSchema);

module.exports = Game;
