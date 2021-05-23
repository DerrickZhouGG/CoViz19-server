const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  ageRange: {
    type: Number,
    required: true,
    default: 0
  },
  location: {
    type: [Number, Number],
    required: false,
  },
  initQuest: {
    type: Schema.Types.ObjectId,
    ref: 'Quest'
  },
  quests: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Quest'
    },
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
  ],
  diagDate: {
    type: String,
    required: true,
    default: new Date()
  },
  recoveryDate: {
    type: String,
    required: true,
    default: new Date()
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
