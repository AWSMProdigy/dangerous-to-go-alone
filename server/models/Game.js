const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema({
  Title: {
    type: String,
    required: 'Game needs a title',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  Developer: {
    type: String,
    required: true,
    trim: true,
  },
  releaseYear: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
