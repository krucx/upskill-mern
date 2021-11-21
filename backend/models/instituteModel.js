const mongoose = require("mongoose");

const instituteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter institute Name"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Please Enter institute Description"]
  },
  price: {
    type: Number,
    required: [true, "Please Enter institute Price"],
    maxLength: [6, "Price cannot exceed 6 digits"]
  },
  rating: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      },
    }
  ],
  category: {
    type: String,
    required: [true, "Please Enter institute Category"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true
      },
      rating: {
        type: Number,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Institute", instituteSchema);