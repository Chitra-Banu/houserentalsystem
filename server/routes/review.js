// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
  try {
    // Extract review data from request body
    const { rating, comment, listingId } = req.body;

    // Create a new review document
    const newReview = new Review({
      rating,
      comment,
      listingId,
    });

    // Save the new review to the database
    await newReview.save();

    // Send a success response
    res.status(201).json(newReview);
  } catch (error) {
    // Handle errors
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
