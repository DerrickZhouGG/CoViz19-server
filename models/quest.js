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
    comment: {
      type: String,
      required: true
    },
    imgRef: {
      type: String
    },
    isInit: {
      type: Boolean,
      default: true
    },
    diagDate: {
      type: Date,
      required: true
    },
    recoveryDate: {
      type: Date
    },
  }, { timestamps: true });

module.exports = mongoose.model('Quest', questSchema);
