const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    imgRef: [
      {
        type: String
      }
    ],
    content: {
      type: String,
      required: true
    },
    loc: {
      // lat: Number
      // lng: Number
    },
    comments: [
      {
        // type: Schema.Types.ObjectId,
        // ref: 'Post',
      }
    ],
    reactions: [
      {
        // userId: reaction
        // reaction is a number, 0 for super sad, 2 for like, 4 for super happy
      }
    ],
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    popularity: {
      type: Number,
      default: 0
    },
  }, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
