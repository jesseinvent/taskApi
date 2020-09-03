const {Schema, model} = require('mongoose');

const taskSchema = new Schema(

  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    collection: 'tasks'
  }

);

module.exports = model('Task', taskSchema);
