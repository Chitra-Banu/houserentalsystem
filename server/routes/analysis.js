// // Import necessary modules
// const express = require('express');
// const router = express.Router();
// const Listing = require('../models/Listing');
// const Review = require('../models/Review');
// const Booking = require('../models/Booking');

// // Route to fetch listing analytics
// router.get('/analytics', async (req, res) => {
//   try {
//     // Fetch all listings from the database
//     const listings = await Listing.find();

//     // Initialize an array to store analytics data for each listing
//     const listingAnalytics = [];

//     // Loop through each listing
//     for (const listing of listings) {
//       // Calculate average rating for the listing
//       const reviews = await Review.find({ listingId: listing._id });
//       let totalRating = 0;
//       if (reviews.length > 0) {
//         totalRating = reviews.reduce((acc, curr) => acc + curr.rating, 0);
//         totalRating /= reviews.length;
//       }

//       // Calculate average booking cost for the listing
//       const bookings = await Booking.find({ listingId: listing._id });
//       let totalBookingCost = 0;
//       if (bookings.length > 0) {
//         totalBookingCost = bookings.reduce((acc, curr) => acc + curr.totalPrice, 0);
//         totalBookingCost /= bookings.length;
//       }

//       // Push analytics data for the listing to the array
//       listingAnalytics.push({
//         listingId: listing._id,
//         averageRating: totalRating.toFixed(1), // Round to one decimal place
//         averageBookingCost: totalBookingCost.toFixed(2), // Round to two decimal places
//       });
//     }

//     // Send the listing analytics data as a response
//     res.json(listingAnalytics);
//   } catch (error) {
//     console.error('Error fetching listing analytics:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;
