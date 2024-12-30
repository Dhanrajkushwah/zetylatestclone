const Contact = require('../models/Contact');
const Pricing = require('../models/Pricing');
const multer = require('multer');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const emailService = require('../services/emailService');

// File Upload Configuration
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});
const upload = multer({ storage });

// Contact Functions
exports.createContact = async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const contact = new Contact({ name, email, message });
    await contact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving contact', error });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving contacts', error });
  }
};

// File Upload Function
exports.uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'File upload failed' });
  }
  res.status(200).json({ message: 'File uploaded successfully', filePath: req.file.path });
};
exports.uploadMiddleware = upload.single('file');

// Payment Functions
exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card']
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Payment processing error', error });
  }
};

// Pricing Functions
exports.createPricing = async (req, res) => {
  const { plan, cardNumber, expiryDate, cvv } = req.body;
  if (!plan || !cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const pricing = new Pricing({ plan, cardNumber, expiryDate, cvv });
    await pricing.save();
    res.status(201).json({ message: 'Pricing saved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving pricing', error });
  }
};

exports.getPricingPlans = async (req, res) => {
  try {
    const pricingPlans = await Pricing.find();
    res.status(200).json(pricingPlans);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving pricing plans', error });
  }
};

// Email Function
exports.sendEmail = async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await emailService.sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
};
