const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symptom: {
      // 0 for none, 1 for inital, 2 for severe
      // hasFever: Number,
      // hasCough: Number,
      // isTired: Number,
      // isDepressed: Number
    },
    ageRange: {
      type: Number,
      enum: [0, 1, 2, 3, 4],
      default: 0
    },
    content: {
      type: String,
      required: true
    },
    imgRef: {
      type: String
    },
    isInit: {
      type: Boolean
    },
    diagDate: {
      type: String
    },
    recoveryDate: {
      type: String
    },
  }, { timestamps: true });

module.exports = mongoose.model('Quest', questSchema);
