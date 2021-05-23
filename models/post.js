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
    loc: {
      // lat: Number
      // lng: Number
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
    reactions: [
      {
        // userRef: {type: Schema.Types.ObjectId},
        // type: {type: Number}
      }
    ],
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    },
    popularity: {
      type: Number,
      required: true,
      default: 0
    },
  }, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
