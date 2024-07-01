// const express = require('express');
// const router = express.Router();
// const Booking = require('../models/Booking'); // Assuming you have a Booking model

// // Check room availability
// router.post('/check', async (req, res) => {
//   try {
//     const { listingId, startDate, endDate } = req.body;
    
//     const bookings = await Booking.find({
//       listingId,
//       $or: [
//         { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
//       ]
//     });

//     if (bookings.length > 0) {
//       res.status(200).json({ available: false, message: 'Room is not available for the selected dates.' });
//     } else {
//       res.status(200).json({ available: true, message: 'Room is available for the selected dates.' });
//     }
//   } catch (error) {
//     res.status(500).json({ message: 'An error occurred while checking availability.' });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Check availability
router.post('/', async (req, res) => {
  const { listingId, startDate, endDate } = req.body;

  try {
    const existingBookings = await Booking.find({
      listingId: listingId,
      $or: [
        { startDate: { $lte: endDate, $gte: startDate } },
        { endDate: { $lte: endDate, $gte: startDate } },
        { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(200).json({ available: false, message: "The listing is not available for the selected dates." });
    }

    res.status(200).json({ available: true, message: "The listing is available for the selected dates." });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
