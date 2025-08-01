const express = require('express');
const Application = require('../models/Application');

const router = express.Router();

// @desc    Get all applications for user
// @route   GET /api/applications
// @access  Private
const getApplications = async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      outcome, 
      source, 
      search,
      sortBy = 'appliedDate',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    const query = { user: req.user.id };
    
    if (status) query.status = status;
    if (outcome) query.outcome = outcome;
    if (source) query.source = source;
    
    if (search) {
      query.$or = [
        { companyName: { $regex: search, $options: 'i' } },
        { position: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { notes: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const applications = await Application.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('user', 'fullName email');

    // Get total count
    const total = await Application.countDocuments(query);

    res.status(200).json({
      status: 'success',
      data: {
        applications,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single application
// @route   GET /api/applications/:id
// @access  Private
const getApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('user', 'fullName email');

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new application
// @route   POST /api/applications
// @access  Private
const createApplication = async (req, res, next) => {
  try {
    // Add user to request body
    req.body.user = req.user.id;

    const application = await Application.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'Application created successfully',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update application
// @route   PUT /api/applications/:id
// @access  Private
const updateApplication = async (req, res, next) => {
  try {
    let application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    application = await Application.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Application updated successfully',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete application
// @route   DELETE /api/applications/:id
// @access  Private
const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    await application.deleteOne();

    res.status(200).json({
      status: 'success',
      message: 'Application deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get application statistics
// @route   GET /api/applications/stats
// @access  Private
const getApplicationStats = async (req, res, next) => {
  try {
    const stats = await Application.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          totalApplications: { $sum: 1 },
          appliedCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Applied'] }, 1, 0] }
          },
          interviewingCount: {
            $sum: {
              $cond: [
                {
                  $in: [
                    '$status',
                    [
                      'Group Discussion Round',
                      'Aptitude Round',
                      'Technical Round 1',
                      'Technical Round 2',
                      'Managerial Round',
                      'HR Round'
                    ]
                  ]
                },
                1,
                0
              ]
            }
          },
          selectedCount: {
            $sum: { $cond: [{ $eq: ['$outcome', 'Selected'] }, 1, 0] }
          },
          rejectedCount: {
            $sum: { $cond: [{ $eq: ['$outcome', 'Rejected'] }, 1, 0] }
          },
          activeCount: {
            $sum: { $cond: [{ $eq: ['$outcome', 'Active'] }, 1, 0] }
          },
          ghostingCount: {
            $sum: { $cond: [{ $eq: ['$status', 'Ghosting'] }, 1, 0] }
          }
        }
      }
    ]);

    // Get status breakdown
    const statusBreakdown = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get outcome breakdown
    const outcomeBreakdown = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$outcome', count: { $sum: 1 } } }
    ]);

    // Get source breakdown
    const sourceBreakdown = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    const result = stats[0] || {
      totalApplications: 0,
      appliedCount: 0,
      interviewingCount: 0,
      selectedCount: 0,
      rejectedCount: 0,
      activeCount: 0,
      ghostingCount: 0
    };

    res.status(200).json({
      status: 'success',
      data: {
        stats: result,
        breakdowns: {
          status: statusBreakdown,
          outcome: outcomeBreakdown,
          source: sourceBreakdown
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add interview round
// @route   POST /api/applications/:id/interview-rounds
// @access  Private
const addInterviewRound = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    application.interviewRounds.push(req.body);
    await application.save();

    res.status(201).json({
      status: 'success',
      message: 'Interview round added successfully',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update interview round
// @route   PUT /api/applications/:id/interview-rounds/:roundId
// @access  Private
const updateInterviewRound = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    const roundIndex = application.interviewRounds.findIndex(
      round => round._id.toString() === req.params.roundId
    );

    if (roundIndex === -1) {
      return res.status(404).json({
        status: 'error',
        message: 'Interview round not found'
      });
    }

    application.interviewRounds[roundIndex] = {
      ...application.interviewRounds[roundIndex].toObject(),
      ...req.body
    };

    await application.save();

    res.status(200).json({
      status: 'success',
      message: 'Interview round updated successfully',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete interview round
// @route   DELETE /api/applications/:id/interview-rounds/:roundId
// @access  Private
const deleteInterviewRound = async (req, res, next) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!application) {
      return res.status(404).json({
        status: 'error',
        message: 'Application not found'
      });
    }

    application.interviewRounds = application.interviewRounds.filter(
      round => round._id.toString() !== req.params.roundId
    );

    await application.save();

    res.status(200).json({
      status: 'success',
      message: 'Interview round deleted successfully',
      data: {
        application
      }
    });
  } catch (error) {
    next(error);
  }
};

router.route('/')
  .get(getApplications)
  .post(createApplication);

router.route('/:id')
  .get(getApplication)
  .put(updateApplication)
  .delete(deleteApplication);

router.get('/stats', getApplicationStats);

router.route('/:id/interview-rounds')
  .post(addInterviewRound);

router.route('/:id/interview-rounds/:roundId')
  .put(updateInterviewRound)
  .delete(deleteInterviewRound);

module.exports = router; 