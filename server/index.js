

// const express = require("express");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv").config();
// const cors = require("cors");
// const bodyParser = require('body-parser');
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// const Razorpay = require('razorpay');
// const crypto = require('crypto');

// const app = express();

// // Models
// const Review = require('./models/Review');
// const Listing = require('./models/Listing');
// const Booking = require('./models/Booking');
// const User = require('./models/User');

// // Routes
// const authRoutes = require("./routes/auth.js");
// const listingRoutes = require("./routes/listing.js");
// const bookingRoutes = require("./routes/booking.js");
// const userRoutes = require("./routes/user.js");
// const reviewsRouter = require('./routes/review.js');
// const availabilityRoutes = require('./routes/availability');

// // Initialize Razorpay
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.static("public"));
// app.use(bodyParser.json());

// // Route Middleware
// app.use("/auth", authRoutes);
// app.use("/properties", listingRoutes);
// app.use("/bookings", bookingRoutes);
// app.use("/users", userRoutes);
// app.use('/reviews', reviewsRouter);
// app.use('/availability', availabilityRoutes);

// // Payment Routes
// app.post('/paymentCapture', (req, res) => {
//   const data = crypto.createHmac('sha256', '1234567890')
//   data.update(JSON.stringify(req.body))
//   const digest = data.digest('hex')
//   console.log(digest);
//   console.log(req.headers['x-razorpay-signature']);
//   console.log('request is legit')
//   res.json({ status: 'ok' })
// });

// app.post('/refund', async (req, res) => {
//   try {
//     const options = {
//       payment_id: req.body.paymentId,
//       amount: req.body.amount,
//     };
//     const razorpayResponse = await razorpay.refund(options);
//     res.send('Successfully refunded')
//   } catch (error) {
//     console.log(error);
//     res.status(400).send('unable to issue a refund');
//   }
// });

// app.post('/order', async (req, res) => {
//   const options = {
//     amount: req.body.amount,
//     currency: req.body.currency,
//     receipt: "any unique id for every order",
//     payment_capture: 1
//   };
//   try {
//     const response = await razorpay.orders.create(options)
//     res.json({
//       order_id: response.id,
//       currency: response.currency,
//       amount: response.amount,
//     })
//   } catch (err) {
//     console.log(err)
//     res.status(400).send('Not able to create order. Please try again!');
//   }
// });

// app.get('/reviews/:listingId', async (req, res) => {
//   try {
//     const { listingId } = req.params;
//     const reviews = await Review.find({ listingId });
//     res.json(reviews);
//   } catch (error) {
//     console.error('Error fetching reviews:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });



// // Analytics Route

// app.get('/analytics/listings', async (req, res) => {
//   try {
//     const listings = await Listing.find();
//     const listingAnalytics = [];

//     for (const listing of listings) {
//       const reviews = await Review.find({ listingId: listing._id });
      
//       // Calculate total rating and count valid ratings
//       let totalRating = 0;
//       let validRatingsCount = 0;

//       reviews.forEach(review => {
//         const rating = parseFloat(review.rating);
//         if (!isNaN(rating)) {
//           totalRating += rating;
//           validRatingsCount++;
//         }
//       });

//       let averageRating = "N/A";
//       if (validRatingsCount > 0) {
//         averageRating = (totalRating / validRatingsCount).toFixed(1);
//       }

//       const bookings = await Booking.find({ listingId: listing._id });
//       let totalBookingCost = 0;
//       let averageBookingCost = "N/A"; // Default value if there are no bookings

//       if (bookings.length > 0) {
//         totalBookingCost = bookings.reduce((acc, curr) => acc + parseFloat(curr.totalPrice), 0);
//         averageBookingCost = (totalBookingCost / bookings.length).toFixed(2);
//       }

//       // Debugging logs
//       // console.log(`Listing ID: ${listing._id}`);
//       // console.log(`Total Ratings: ${totalRating}`);
//       // console.log(`Average Rating: ${averageRating}`);
//       // console.log(`Reviews Count: ${reviews.length}`);
//       // console.log(`Total Booking Cost: ${totalBookingCost}`);
//       // console.log(`Average Booking Cost: ${averageBookingCost}`);
//       // console.log(`Bookings Count: ${bookings.length}`);

//       listingAnalytics.push({
//         listingId: listing._id,
//         listingCategory: listing.category,
//         averageRating,
//         numberOfBookings: bookings.length,
//         averageBookingCost,
//       });
//     }

//     res.json(listingAnalytics);
//   } catch (error) {
//     console.error('Error fetching listing analytics:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });




// // Database Connection and Server Start
// const PORT = process.env.PORT || 3001;
// mongoose.connect(process.env.MONGO_URL, {
//   dbName: "Dream_Nest",
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
//   })
//   .catch((err) => console.log(`${err} did not connect`));

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(express.static("public"));
// Models
const Review = require('./models/Review');
const Listing = require('./models/Listing');
const Booking = require('./models/Booking');
const User = require('./models/User');

// Routes
const authRoutes = require("./routes/auth");
const listingRoutes = require("./routes/listing");
const bookingRoutes = require("./routes/booking");
const userRoutes = require("./routes/user");
const reviewsRouter = require('./routes/review');
const availabilityRoutes = require('./routes/availability');

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.json());

// Route Middleware
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use('/reviews', reviewsRouter);
// app.use('/check-availability', availabilityRoutes);
app.use('/availability', availabilityRoutes);
 // Ensure this path matches the one used in frontend

// Payment Routes
app.post('/paymentCapture', (req, res) => {
  const data = crypto.createHmac('sha256', '1234567890')
  data.update(JSON.stringify(req.body))
  const digest = data.digest('hex');
  res.json({ status: 'ok' })
});

app.post('/refund', async (req, res) => {
  try {
    const options = {
      payment_id: req.body.paymentId,
      amount: req.body.amount,
    };
    const razorpayResponse = await razorpay.refund(options);
    res.send('Successfully refunded')
  } catch (error) {
    console.log(error);
    res.status(400).send('unable to issue a refund');
  }
});

app.post('/order', async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "any unique id for every order",
    payment_capture: 1
  };
  try {
    const response = await razorpay.orders.create(options)
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (err) {
    console.log(err)
    res.status(400).send('Not able to create order. Please try again!');
  }
});

app.get('/reviews/:listingId', async (req, res) => {
  try {
    const { listingId } = req.params;
    const reviews = await Review.find({ listingId });
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Analytics Route
app.get('/analytics/listings', async (req, res) => {
  try {
    const listings = await Listing.find();
    const listingAnalytics = [];

    for (const listing of listings) {
      const reviews = await Review.find({ listingId: listing._id });
      
      let totalRating = 0;
      let validRatingsCount = 0;

      reviews.forEach(review => {
        const rating = parseFloat(review.rating);
        if (!isNaN(rating)) {
          totalRating += rating;
          validRatingsCount++;
        }
      });

      let averageRating = "N/A";
      if (validRatingsCount > 0) {
        averageRating = (totalRating / validRatingsCount).toFixed(1);
      }

      const bookings = await Booking.find({ listingId: listing._id });
      let totalBookingCost = 0;
      let averageBookingCost = "N/A"; 

      if (bookings.length > 0) {
        totalBookingCost = bookings.reduce((acc, curr) => acc + parseFloat(curr.totalPrice), 0);
        averageBookingCost = (totalBookingCost / bookings.length).toFixed(2);
      }

      listingAnalytics.push({
        listingId: listing._id,
        listingCategory: listing.category,
        averageRating,
        numberOfBookings: bookings.length,
        averageBookingCost,
      });
    }

    res.json(listingAnalytics);
  } catch (error) {
    console.error('Error fetching listing analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Database Connection and Server Start
const PORT = process.env.PORT || 3001;
mongoose.connect(process.env.MONGO_URL, {
  dbName: "Dream_Nest",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));

