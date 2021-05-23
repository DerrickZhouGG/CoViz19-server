const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questSchema = new Schema(
  {
    userRef: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    symptom: [
      {
        hasFever: Number,
        hasCough: Number,
        isTired: Number,
        isDepressed: Number
      }
    ],
    ageRange: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    },
    imgRef: {
      type: String,
      required: false
    },
    isInit: {
      type: Boolean,
      required: true,
      default: true
    },
    diagDate: {
      type: String,
      required: true
    },
    recoveryDate: {
      type: String,
      required: false
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quest', questSchema);
