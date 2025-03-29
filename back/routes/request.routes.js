const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const requestController = require('../controllers/request.controller');
const auth = require('../middleware/auth');

// @route   GET /api/requests
// @desc    Get all blood requests
// @access  Public
router.get('/', requestController.getAllRequests);

// @route   GET /api/requests/me
// @desc    Get current user's blood requests
// @access  Private
router.get('/me', auth, requestController.getMyRequests);

// @route   GET /api/requests/:id
// @desc    Get blood request by ID
// @access  Public
router.get('/:id', requestController.getRequestById);

// @route   POST /api/requests
// @desc    Create a new blood request
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('patientName', 'Patient name is required').not().isEmpty(),
      check('bloodType', 'Blood type is required').not().isEmpty(),
      check('unitsNeeded', 'Number of units needed is required').isNumeric(),
      check('hospital', 'Hospital information is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('reason', 'Reason is required').not().isEmpty(),
      check('requiredBy', 'Required by date is required').not().isEmpty(),
      check('contactInfo', 'Contact information is required').not().isEmpty()
    ]
  ],
  requestController.createRequest
);

// @route   PUT /api/requests/:id
// @desc    Update blood request
// @access  Private
router.put('/:id', auth, requestController.updateRequest);

// @route   PUT /api/requests/:id/respond/:donorId
// @desc    Respond to blood request (donor)
// @access  Private
router.put(
  '/:id/respond/:donorId',
  [
    auth,
    check('status', 'Status is required').isIn(['accepted', 'declined', 'pending', 'donated'])
  ],
  requestController.respondToRequest
);

// @route   DELETE /api/requests/:id
// @desc    Delete blood request
// @access  Private
router.delete('/:id', auth, requestController.deleteRequest);

// @route   GET /api/requests/nearby
// @desc    Find nearby blood requests
// @access  Private
router.get('/nearby', auth, requestController.findNearbyRequests);

// @route   GET /api/requests/directions/:requestId
// @desc    Get directions to a blood request location
// @access  Private
router.get('/directions/:requestId', auth, requestController.getDirectionsToRequest);

module.exports = router;
