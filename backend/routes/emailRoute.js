import nodemailer from "nodemailer";
import express from "express";

const router = express.Router();

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pamujulapujith.15@gmail.com", // Your Gmail address
    pass: "ggislcncdpvarfce", // Your Gmail password or app-specific password
  },
});

// Function to send confirmation email
const sendConfirmationEmail = async (to) => {
  console.log(to);
  try {
    // Send email
    await transporter.sendMail({
      from: "pamujulapujith.15@gmail.com",
      to,
      subject: 'Order Confirmation',
      html: `<p>Your order has been successfully placed. Thank you for visiting the website</p>`,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
};

// Example route for checkout
router.post("/checkout", async (req, res) => {
  try {
    // You can perform any additional actions here (e.g., logging, analytics)

    // Send email confirmation
    await sendConfirmationEmail(req.body.email);

    res.json({ message: "Order placed successfully" });
  } catch (error) {
    console.error("Error during checkout:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
