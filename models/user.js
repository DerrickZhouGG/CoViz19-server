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
  /* 0 => not provided
     1 => 0~18 yrs old
     2 => 19 ~ 39 yrs old
     3 => 40 ~59 yrs old
     4 => 60+ */
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
    type: String,
  },
  recoveryDate: {
    type: String
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
