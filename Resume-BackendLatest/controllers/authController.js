const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const path = require('path');
const cloudinary = require('../config/cloudinaryConfig');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');



const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile_pictures', // Folder in Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Only allow specific formats
  },
});

const upload = multer({ storage }).single('profilePicture');

const generateToken = (user) => jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

exports.registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ fullName, email, password });
    await user.save();
    const token = generateToken(user);

    res.status(201).json({ msg: 'User registered successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const token = generateToken(user);
    res.json({ msg: 'User logged in successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};



// Update User Profile
exports.updateUserProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { fullName, email, phone } = req.body;
    const profilePicture = req.file ? req.file.path : undefined;

    try {
      const updatedFields = { fullName, email, phone };
      if (profilePicture) updatedFields.profilePicture = profilePicture;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedFields },
        { new: true }
      );

      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    await User.findByIdAndDelete(req.user.id);
    res.json({ msg: 'User profile deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

// Handle OAuth callbacks
exports.oauthCallback = (req, res) => {
  const token = generateToken(req.user);
  res.json({ msg: `User logged in with ${req.authType} successfully`, token });
};
