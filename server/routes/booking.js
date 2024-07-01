
const router = require("express").Router()

const Booking = require("../models/Booking")
const nodemailer = require("nodemailer");
const emailcomponent = require("../components/emailcomponent");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    console.log(req.body)
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
    await newBooking.save()
    const subject="Warm Greetings From EnviroStay!"
    const htmlContent=`<h2>Booking Confirmation!!</h2>
    <p>Thank you for booking!</p>
    <p>We are pleased to inform you that your booking for the rental property has been successfully confirmed!</p>
    <p>Booking Details:</p>
      <ul>
        <li>Start Date: ${startDate}</li>
        <li>End Date: ${endDate}</li>
        <li>Total Price:Rs. ${totalPrice}</li>
      </ul>
    <div>If you have any questions or need assistance during your stay, Feel free to contact, <a href="mailto:envirostay@gmail.com">envirostay@gmail.com</a> to contact our customer support team.</div>
    <p>We are here to ensure your experience is nothing short of exceptional.</p>
    <p>Thank you for choosing EnviroStay!!. We look forward to hosting you and providing you with a comfortable and memorable stay.</p>
    <p>Happy Stay!</p>
    <p>Warm regards,</p>
    
    <p>The EnviroStay Team</p>`
    console.log(process.env.SMTP_FROM, req.body.customerEmail, subject, htmlContent)
    await (new emailcomponent()).sendSMTPMail(process.env.SMTP_FROM, req.body.customerEmail, subject, htmlContent);
    res.status(200).json(newBooking)
  } catch (err) {
    console.log("message",err)
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
  }
})

module.exports = router

// const EmailComponent = require("../components/emailcomponent");


// const emailComponent = new EmailComponent();

// // Assuming you have a Booking model and a function to create a new booking
// async function createBooking(req, res) {
//   try {
//     // Your logic to create a new booking...

//     // After creating the booking, prepare the email content
//     const userEmail = req.body.userEmail; // Assuming userEmail is provided in the request body
//     const bookingDetails = req.body.bookingDetails; // Assuming bookingDetails is provided in the request body

//     const subject = "Booking Confirmation";
//     const htmlContent = `<p>Your booking details: ${JSON.stringify(bookingDetails)}</p>`;

//     // Send the email
//     await emailComponent.sendSMTPMail("sender@example.com", userEmail, subject, htmlContent);

//     res.status(201).json({ message: "Booking created successfully" });
//   } catch (error) {
//     console.error("Failed to create booking:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// module.exports = {
//   createBooking,
// };


