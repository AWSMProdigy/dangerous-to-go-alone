const { Schema, model, connection } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  games: [
    {
      type: String,
    },
  ],
  description: {
    type: String
  },
  fromTime:
  {
    type: String,
  },
  toTime:
  {
    type: String,
  },
  friends: [
    {
      type: String,
    }
  ],
  platform: {
    type: String,
    default: ""
  },
  discord:{
    type: String
  },
  xboxName:{
    type: String
  },
  steamName:{
    type: String
  },
  playstationName:{
    type: String
  },
  profPic: {
    type: String
  },
  canLfg: {
    type: Boolean,
    default: true
  },
  playstyle: {
    type: String,
    default: "Casual"
  }

  // blockedUsers: [
  //   {
  //     type:Schema.Types.ObjectId,
  //     ref: 'User',
  //   }
  // ],
  // friendRequests: [
  //   {
  //     type:Schema.Types.ObjectId,
  //     ref: 'User',
  //   }
  // ],
});

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
