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
      title:{
        type: String,
        required: "Title necessary",
        default: "Title here"
      },
      players: [
        {
          type: String,
          required: "Needs creator",
          default: "Nothing"
        },
      ],
      capacity: {
        type: String,
        required: "Needs capacity",
        default: 1
      }
    }
  ]
});

const Game = model('Game', gameSchema);

module.exports = Game;
