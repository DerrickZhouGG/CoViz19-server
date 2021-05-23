const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    questRef: {
      type: Schema.Types.ObjectId,
      ref: 'Quest',
      required: true
    },
    imgRef: [
      {
        type: String,
        required: false
      }
    ],
    content: {
      type: String,
      required: true
    },
    location: {
      type: [Number, Number],
      required: false,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
    reactions: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        },
        number: {
          type: Number
        }
      }
    ],
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: false
    },
    popularity: {
      type: Number,
      required: true,
      default: 0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
