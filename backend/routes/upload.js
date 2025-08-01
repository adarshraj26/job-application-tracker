const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  // Allow only specific file types
  const allowedTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/jpeg',
    'image/png'
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, JPEG, and PNG files are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1
  },
  fileFilter: fileFilter
});

// @desc    Upload resume
// @route   POST /api/upload/resume
// @access  Private
const uploadResume = async (req, res, next) => {
  try {
    upload.single('resume')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: err.message
        });
      }

      if (!req.file) {
        return res.status(400).json({
          status: 'error',
          message: 'Please upload a file'
        });
      }

      // Create file info object
      const fileInfo = {
        originalName: req.file.originalname,
        fileName: req.file.filename,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        url: `/uploads/${req.file.filename}`
      };

      res.status(200).json({
        status: 'success',
        message: 'File uploaded successfully',
        data: {
          file: fileInfo
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload multiple documents
// @route   POST /api/upload/documents
// @access  Private
const uploadDocuments = async (req, res, next) => {
  try {
    const uploadMultiple = upload.array('documents', 5); // Max 5 files

    uploadMultiple(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          status: 'error',
          message: err.message
        });
      }

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          status: 'error',
          message: 'Please upload at least one file'
        });
      }

      // Create file info objects
      const files = req.files.map(file => ({
        originalName: file.originalname,
        fileName: file.filename,
        fileSize: file.size,
        mimeType: file.mimetype,
        url: `/uploads/${file.filename}`
      }));

      res.status(200).json({
        status: 'success',
        message: 'Files uploaded successfully',
        data: {
          files
        }
      });
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:filename
// @access  Private
const deleteFile = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({
        status: 'success',
        message: 'File deleted successfully'
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'File not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get file info
// @route   GET /api/upload/:filename
// @access  Private
const getFileInfo = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileInfo = {
        filename,
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        url: `/uploads/${filename}`
      };

      res.status(200).json({
        status: 'success',
        data: {
          file: fileInfo
        }
      });
    } else {
      res.status(404).json({
        status: 'error',
        message: 'File not found'
      });
    }
  } catch (error) {
    next(error);
  }
};

router.post('/resume', uploadResume);
router.post('/documents', uploadDocuments);
router.delete('/:filename', deleteFile);
router.get('/:filename', getFileInfo);

module.exports = router; 