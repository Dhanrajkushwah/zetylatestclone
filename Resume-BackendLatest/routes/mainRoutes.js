const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main.controller');

// Contact Routes
router.post('/contacts', mainController.createContact);
router.get('/contacts', mainController.getContacts);

// File Upload Route
router.post('/upload', mainController.uploadMiddleware, mainController.uploadFile);

// Payment Route
router.post('/payments/create-payment-intent', mainController.createPaymentIntent);

// Pricing Routes
router.post('/pricing', mainController.createPricing);
router.get('/pricing', mainController.getPricingPlans);

// Email Route
router.post('/email', mainController.sendEmail);

module.exports = router;
