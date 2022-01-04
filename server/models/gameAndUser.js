const { Schema, model } = require('mongoose');
const { User } = require('./User');
const {Game} = require('./Game');

const dateFormat = require('../utils/dateFormat');

const gameAndUserSchema = new Schema({
  game: {
    type: Schema.Types.ObjectId, ref: 'Game'
  },
  players: [
    {
        type: Schema.Types.ObjectId, ref: 'User'
    }
],
});

const gameAndUser = model('gameAndUser', gameAndUserSchema);

module.exports = gameAndUser;
