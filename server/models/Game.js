const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema({
  title: {
    type: String,
    required: 'Game needs a title',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  developer: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

const Game = model('Game', gameSchema);

module.exports = Game;
