const { Schema, model } = require('mongoose');

const lfgSchema = new Schema({
  title: {
    type: String,
    required: 'lfg needs a title',
    minlength: 1,
    maxlength: 280,
    unique: true
  },
  players: [
    {
      type: String
    }
  ],
  capacity: {
    type: String
  }
});

const lfg = model('lfg', lfgSchema);

module.exports = lfg;
