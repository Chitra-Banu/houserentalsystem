const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  listingId: String, // ID of the listing this review belongs to
  comment: String, // Review comment
  rating: Number, // Rating (e.g., 1 to 5)
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
