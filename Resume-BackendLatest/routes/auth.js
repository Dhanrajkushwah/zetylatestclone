const express = require('express');
const passport = require('passport');

const { registerUser, loginUser, oauthCallback, getUserProfile, updateUserProfile, deleteUserProfile } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const router = express.Router();


router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// Get user profile
router.get('/auth/profile', authenticate, getUserProfile);

// Create or update user profile
router.put('/auth/profile', authenticate, updateUserProfile);

// Delete user profile
router.delete('/auth/profile', authenticate, deleteUserProfile);


router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', (req, res, next) => {
  req.authType = 'Google';
  passport.authenticate('google', { failureRedirect: '/login' }, (err, user) => {
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      oauthCallback(req, res);
    });
  })(req, res, next);
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/auth/facebook/callback', (req, res, next) => {
  req.authType = 'Facebook';
  passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user) => {
    req.logIn(user, (loginErr) => {
      if (loginErr) return next(loginErr);
      oauthCallback(req, res);
    });
  })(req, res, next);
});

module.exports = router;
