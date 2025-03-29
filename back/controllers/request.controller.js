const BloodRequest = require('../models/BloodRequest');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const notificationController = require('./notification.controller');
const socketUtils = require('../utils/socket');
const { sendEmail, emailTemplates } = require('../utils/email');

// Get all blood requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find()
      .populate('requestedBy', ['name', 'email'])
      .populate('donors.donor', ['user', 'bloodType']);
    
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blood request by ID
exports.getRequestById = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id)
      .populate('requestedBy', ['name', 'email'])
      .populate('donors.donor', ['user', 'bloodType']);
    
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Get blood requests for current user
exports.getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requestedBy: req.user.id })
      .populate('requestedBy', ['name', 'email'])
      .populate('donors.donor', ['user', 'bloodType']);
    
    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new blood request
exports.createRequest = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    patientName,
    bloodType,
    unitsNeeded,
    hospital,
    location,
    urgency,
    reason,
    requiredBy,
    contactInfo,
    userEmail // Get email from request if provided
  } = req.body;

  try {
    // Check if user has reached the daily limit of 15 requests
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Start of tomorrow
    
    const requestCount = await BloodRequest.countDocuments({
      requestedBy: req.user.id,
      createdAt: { $gte: today, $lt: tomorrow }
    });
    
    if (requestCount >= 15) {
      return res.status(400).json({ 
        message: 'Daily limit reached. You can create a maximum of 15 blood requests per day.' 
      });
    }

    const newRequest = new BloodRequest({
      requestedBy: req.user.id,
      patientName,
      bloodType,
      unitsNeeded,
      hospital,
      location,
      urgency: urgency || 'normal',
      reason,
      requiredBy,
      contactInfo
    });

    const request = await newRequest.save();
    
    // Get user information for notification
    const user = await User.findById(req.user.id).select('name email');
    
    // Determine the email to use - prioritize user email from request, then from database
    // This ensures we use what the user entered in the form first
    const emailToUse = userEmail || contactInfo?.email || user?.email || null;
    
    console.log('Email determination:', {
      userEmailFromRequest: userEmail,
      contactInfoEmail: contactInfo?.email,
      userEmailFromDB: user?.email,
      finalEmailToUse: emailToUse
    });
    
    // Send notification to the user
    if (user) {
      // Add in-app notification
      await notificationController.addNotificationToUser(req.user.id, {
        title: 'Blood Request Created',
        message: `Your blood request for ${bloodType} blood type has been created successfully.`,
        type: 'new_blood_request',
        urgent: urgency === 'emergency'
      });
      
      // Also notify via socket if available
      socketUtils.notifyUser(req.user.id, 'new_blood_request', {
        title: 'Blood Request Created',
        message: `Your blood request for ${bloodType} blood type has been created successfully.`,
        requestId: request._id,
        email: emailToUse
      });
      
      // Send email notification
      if (emailToUse) {
        try {
          console.log(`Attempting to send email to ${emailToUse}`);
          
          // Create HTML content for email
          const htmlContent = `
            <h2 style="color: #e53e3e;">Your Blood Request Has Been Created</h2>
            <p>Dear ${user.name || patientName || 'User'},</p>
            <p>Your request for <strong>${bloodType}</strong> blood type has been successfully created.</p>
            <p><strong>Request Details:</strong></p>
            <ul style="list-style-type: none; padding-left: 0;">
              <li style="margin-bottom: 8px;"><strong>Patient Name:</strong> ${patientName}</li>
              <li style="margin-bottom: 8px;"><strong>Blood Type:</strong> ${bloodType}</li>
              <li style="margin-bottom: 8px;"><strong>Units Needed:</strong> ${unitsNeeded}</li>
              <li style="margin-bottom: 8px;"><strong>Hospital:</strong> ${hospital.name || 'Not specified'}</li>
              <li style="margin-bottom: 8px;"><strong>Location:</strong> ${hospital.address || ''}, ${hospital.city || ''}, ${hospital.state || ''}</li>
              <li style="margin-bottom: 8px;"><strong>Urgency:</strong> ${urgency || 'Normal'}</li>
              <li style="margin-bottom: 8px;"><strong>Required By:</strong> ${new Date(requiredBy).toLocaleDateString()}</li>
            </ul>
            <p>You will be notified when donors respond to your request.</p>
            <p>Thank you for using BloodHero!</p>
            <p style="font-size: 12px; color: #666;">This is an automated message. Please do not reply to this email.</p>
          `;
          
          // Send the email directly
          const emailResult = await sendEmail(
            emailToUse,
            `Blood Request Created: ${bloodType}`,
            htmlContent
          );
          
          console.log(`Email notification result:`, emailResult);
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError);
          // Continue execution even if email fails
        }
      } else {
        console.log('No email address found for notification');
      }
    }
    
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update blood request
exports.updateRequest = async (req, res) => {
  const {
    patientName,
    bloodType,
    unitsNeeded,
    hospital,
    location,
    urgency,
    reason,
    status,
    requiredBy,
    contactInfo
  } = req.body;

  // Build request object
  const requestFields = {};
  if (patientName) requestFields.patientName = patientName;
  if (bloodType) requestFields.bloodType = bloodType;
  if (unitsNeeded) requestFields.unitsNeeded = unitsNeeded;
  if (hospital) requestFields.hospital = hospital;
  if (location) requestFields.location = location;
  if (urgency) requestFields.urgency = urgency;
  if (reason) requestFields.reason = reason;
  if (status) requestFields.status = status;
  if (requiredBy) requestFields.requiredBy = requiredBy;
  if (contactInfo) requestFields.contactInfo = contactInfo;

  try {
    let request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    // Check if user owns the request or is admin
    if (request.requestedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Update request
    request = await BloodRequest.findByIdAndUpdate(
      req.params.id,
      { $set: requestFields },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Respond to blood request (donor)
exports.respondToRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    const { status } = req.body;
    
    // Check if donor already responded
    const donorIndex = request.donors.findIndex(
      donor => donor.donor.toString() === req.params.donorId
    );

    if (donorIndex !== -1) {
      // Update existing response
      request.donors[donorIndex].status = status;
      request.donors[donorIndex].responseDate = Date.now();
    } else {
      // Add new response
      request.donors.push({
        donor: req.params.donorId,
        status,
        responseDate: Date.now()
      });
    }

    // Update request status if needed
    if (status === 'donated') {
      const donatedCount = request.donors.filter(d => d.status === 'donated').length;
      if (donatedCount >= request.unitsNeeded) {
        request.status = 'fulfilled';
      } else if (donatedCount > 0) {
        request.status = 'partially_fulfilled';
      }
    }

    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete blood request
exports.deleteRequest = async (req, res) => {
  try {
    const request = await BloodRequest.findById(req.params.id);
    
    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    // Check if user owns the request or is admin
    if (request.requestedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await request.remove();
    res.json({ message: 'Blood request removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Find nearby blood requests
exports.findNearbyRequests = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance, bloodType } = req.query;
    
    // Convert parameters
    const coords = [parseFloat(longitude), parseFloat(latitude)];
    const distance = parseInt(maxDistance) || 10000; // Default 10km
    
    // Find requests near the coordinates
    const requests = await BloodRequest.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coords
          },
          $maxDistance: distance
        }
      },
      status: { $in: ['pending', 'partially_fulfilled'] },
      ...(bloodType && { bloodType })
    }).populate('requestedBy', ['name', 'email']);

    res.json(requests);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get directions to a fixed location
// @route   GET /api/requests/directions/:requestId
// @access  Private
exports.getDirectionsToRequest = async (req, res) => {
  try {
    const requestId = req.params.requestId;
    
    // Validate request ID
    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ message: 'Invalid request ID format' });
    }
    
    // Get the request
    const bloodRequest = await BloodRequest.findById(requestId);
    
    if (!bloodRequest) {
      return res.status(404).json({ message: 'Blood request not found' });
    }
    
    // Use the fixed coordinates for the destination
    const fixedCoordinates = {
      lat: 29.159770,
      lng: 75.737342
    };
    
    // Get user's current location from query params
    const { userLat, userLng } = req.query;
    
    if (!userLat || !userLng) {
      return res.status(400).json({ message: 'User coordinates are required' });
    }
    
    // Return the directions data
    res.json({
      requestId: bloodRequest._id,
      requestDetails: {
        patientName: bloodRequest.patientName,
        bloodType: bloodRequest.bloodType,
        hospital: bloodRequest.hospital,
        urgency: bloodRequest.urgency
      },
      userLocation: {
        lat: parseFloat(userLat),
        lng: parseFloat(userLng)
      },
      destinationLocation: fixedCoordinates
    });
  } catch (error) {
    console.error('Error getting directions:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
