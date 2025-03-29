const User = require('../models/User');
const Donor = require('../models/Donor');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { sendEmail, sendLoginNotification, sendRegistrationNotification } = require('../utils/email');

// Register a new user
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { 
      name, 
      email, 
      password, 
      role,
      phone,
      bloodGroup,
      dateOfBirth,
      address,
      age
    } = req.body;

    console.log(`Registration attempt for email: ${email}`);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log(`Registration failed: User with email ${email} already exists`);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      role: role || 'donor',
      phone
    });

    await user.save();
    console.log(`User created successfully: ${name} (${email})`);

    // If registering as a donor, create donor profile
    if (role === 'donor' || !role) {
      // Calculate age if not provided but dateOfBirth is
      let calculatedAge = age;
      if (!calculatedAge && dateOfBirth) {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        calculatedAge = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          calculatedAge--;
        }
      }

      // Create donor profile
      const donorProfile = new Donor({
        user: user._id,
        bloodType: bloodGroup,
        age: calculatedAge || 18, // Default to 18 if not provided
        weight: req.body.weight || 50, // Use weight from form or default to 50
        gender: req.body.gender || 'other', // Use gender from form or default to 'other'
        phone: phone,
        address: address || {},
        location: {
          type: 'Point',
          coordinates: req.body.location?.coordinates || [77.2090, 28.6139] // Default coordinates (Delhi)
        },
        isAvailable: true
      });

      await donorProfile.save();
      console.log(`Donor profile created for user: ${name} (${email})`);
    }

    // Send registration confirmation email using dedicated function
    try {
      console.log(`Sending registration notification for ${email} using dedicated function`);
      
      const userData = {
        name,
        email,
        role: role || 'donor',
        bloodGroup
      };
      
      const emailResult = await sendRegistrationNotification(email, name, userData);
      
      if (emailResult) {
        console.log(`Registration notification sent successfully to ${email}`);
      } else {
        console.log(`Failed to send registration notification to ${email}`);
      }
    } catch (emailError) {
      console.error('Failed to send registration confirmation email:', emailError);
      // Continue execution even if email fails
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            userType: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    console.log(`Login attempt for email: ${email}`);

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`Login failed: User with email ${email} not found`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Login failed: Invalid password for user ${email}`);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log(`Login successful for user: ${user.name} (${email})`);

    // Send login notification email using the dedicated function
    try {
      console.log(`Sending login notification for ${email} using dedicated function`);
      const loginTime = new Date();
      
      // Use the dedicated function for login notifications
      const emailResult = await sendLoginNotification(email, user.name, loginTime);
      
      if (emailResult) {
        console.log(`Login notification sent successfully to ${email}`);
      } else {
        console.log(`Failed to send login notification to ${email}`);
      }
    } catch (emailError) {
      console.error('Failed to send login notification email:', emailError);
      // Continue execution even if email fails
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            userType: user.role
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, profileImage } = req.body;
    
    // Build update object
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (profileImage) updateFields.profileImage = profileImage;

    // Update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get user
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
