const { Schema, model } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const listingSchema = new Schema(
  {
    title:
    {
      type: String,
      required: true
    },
    price: 
    {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    condition: {
      type: String, 
      required: true
    },
    media: [
      {
        type: String,
      },
    ]
  }
);

const Listing = model('Listing', listingSchema)

module.exports = Listing;
