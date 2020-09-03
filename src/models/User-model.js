const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    userType: {
      type: String,
      required: true,
      default: 'user'
    }
  },
  {
    timestamps: true,
    collection: 'users'
  }
);

module.exports = model('User', userSchema);
