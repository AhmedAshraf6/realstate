const mongoose = require('mongoose');

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxlength: 50,
      minlength: 3,
    },
    description: {
      type: String,
      required: [true, 'Please provide description'],
      maxlength: 500,
      minlength: 3,
    },
    address: {
      type: String,
      required: [true, 'Please provide address'],
      maxlength: 50,
      minlength: 3,
    },
    regularPrice: {
      type: Number,
      required: [true, 'Please provide price'],
      min: 0,
    },
    discountedPrice: {
      type: Number,
      required: [true, 'discountedPrice'],
      default: 0,
      min: 0,
    },
    bathrooms: {
      type: Number,
      required: [true, 'Please provide bathrooms'],
      min: 1,
    },
    bedrooms: {
      type: Number,
      required: [true, 'Please provide bedrooms'],
      min: 1,
    },
    furnished: {
      type: Boolean,
      required: [true, 'Please provide furnished'],
    },
    parking: {
      type: Boolean,
      required: [true, 'Please provide parking'],
    },
    type: {
      type: String,
      required: [true, 'Please provide type'],
      maxlength: 50,
      minlength: 3,
    },
    offer: {
      type: Boolean,
      required: [true, 'Please provide offer'],
    },
    imageUrls: {
      type: [String],
      required: [true, 'Please provide images'],
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Listing', ListingSchema);
