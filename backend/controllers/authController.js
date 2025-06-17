const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }
    
    // Create new user
    const user = new User({ name, email, password });
    await user.save();
    
    // Generate token
    const token = generateToken(user._id);
    
    // Return user data (excluding password) and token
    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user account' });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    if (!user.password) {
      return res.status(401).json({ message: 'This account uses Google login' });
    }
    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
      token
    });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(500).json({ message: 'Error signing in' });
  }
};

exports.googleAuth = async (req, res) => {
  try {
    const { token } = req.body;
    
    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const { sub: googleId, email, name, picture } = ticket.getPayload();
    
    // Find or create user
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    
    if (!user) {
      // Create new user with Google data
      user = new User({
        name,
        email,
        googleId,
        profilePicture: picture
      });
      await user.save();
    } else if (!user.googleId) {
      // Update existing email user to link Google account
      user.googleId = googleId;
      user.profilePicture = picture || user.profilePicture;
      await user.save();
    }
    
    // Generate token
    const jwtToken = generateToken(user._id);
    
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture
      },
      token: jwtToken
    });
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Error with Google authentication' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Error fetching profile' });
  }
};
