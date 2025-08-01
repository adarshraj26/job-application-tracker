const express = require('express');
const User = require('../models/User');

const router = express.Router();

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      fullName: req.body.fullName,
      preferences: req.body.preferences
    };

    const user = await User.findByIdAndUpdate(
      req.user.id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isProUser: user.isProUser,
          isPro: user.isPro(),
          preferences: user.preferences,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upgrade to pro
// @route   POST /api/users/upgrade-pro
// @access  Private
const upgradeToPro = async (req, res, next) => {
  try {
    const { paymentMethod, paymentId } = req.body;

    // TODO: Verify payment with payment gateway
    // For now, just upgrade the user

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        isProUser: true,
        proExpiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Successfully upgraded to Pro',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isProUser: user.isProUser,
          isPro: user.isPro(),
          proExpiryDate: user.proExpiryDate
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Cancel pro subscription
// @route   POST /api/users/cancel-pro
// @access  Private
const cancelPro = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        isProUser: false,
        proExpiryDate: null
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'Pro subscription cancelled successfully',
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          isProUser: user.isProUser,
          isPro: user.isPro(),
          proExpiryDate: user.proExpiryDate
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user analytics
// @route   GET /api/users/analytics
// @access  Private
const getUserAnalytics = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    
    // Calculate user statistics
    const analytics = {
      accountAge: Math.floor((new Date() - user.createdAt) / (1000 * 60 * 60 * 24)),
      lastLoginDays: Math.floor((new Date() - user.lastLogin) / (1000 * 60 * 60 * 24)),
      isPro: user.isPro(),
      proDaysLeft: user.proExpiryDate ? 
        Math.floor((user.proExpiryDate - new Date()) / (1000 * 60 * 60 * 24)) : 0
    };

    res.status(200).json({
      status: 'success',
      data: {
        analytics
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account
// @route   DELETE /api/users/account
// @access  Private
const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Verify password
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Password is incorrect'
      });
    }

    // TODO: Delete all user's applications
    // await Application.deleteMany({ user: req.user.id });

    // Deactivate user account
    await User.findByIdAndUpdate(req.user.id, { isActive: false });

    res.status(200).json({
      status: 'success',
      message: 'Account deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

router.put('/profile', updateProfile);
router.post('/upgrade-pro', upgradeToPro);
router.post('/cancel-pro', cancelPro);
router.get('/analytics', getUserAnalytics);
router.delete('/account', deleteAccount);

module.exports = router; 