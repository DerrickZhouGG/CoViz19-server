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
    enum: [0, 1, 2, 3, 4],
    default: 0
  },
  loc: {
    // lat: Number
    // lng: Number
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
    type: Date,
    required: true,
    default: new Date()
  },
  recoveryDate: {
    type: Date,
    required: true,
    default: new Date()
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
