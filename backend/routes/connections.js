const express = require('express');
const router = express.Router();
const Connection = require('../models/Connection');

// @route   GET /api/connections
// @desc    Get all connections for the authenticated user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const connections = await Connection.find({ user: req.user.id }).sort({ dateAdded: -1 });
    
    res.json({
      status: 'success',
      data: {
        connections: connections
      }
    });
  } catch (error) {
    console.error('Error fetching connections:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while fetching connections'
    });
  }
});

// @route   POST /api/connections
// @desc    Create a new connection
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { name, company, position, email, linkedin, status, notes, tags } = req.body;

    // Validate required fields
    if (!name || !company || !position) {
      return res.status(400).json({
        status: 'error',
        message: 'Name, company, and position are required'
      });
    }

    // Create new connection
    const newConnection = new Connection({
      user: req.user.id,
      name,
      company,
      position,
      email: email || '',
      linkedin: linkedin || '',
      status: status || 'pending',
      notes: notes || '',
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)) : []
    });

    const savedConnection = await newConnection.save();

    res.status(201).json({
      status: 'success',
      data: {
        connection: {
          id: savedConnection._id,
          name: savedConnection.name,
          company: savedConnection.company,
          position: savedConnection.position,
          email: savedConnection.email,
          linkedin: savedConnection.linkedin,
          dateAdded: savedConnection.dateAdded,
          lastContact: savedConnection.lastContact,
          status: savedConnection.status,
          notes: savedConnection.notes,
          tags: savedConnection.tags,
          createdAt: savedConnection.createdAt,
          updatedAt: savedConnection.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Error creating connection:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error while creating connection'
    });
  }
});

// @route   PUT /api/connections/:id
// @desc    Update a connection
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { name, company, position, email, linkedin, status, notes, tags, lastContact } = req.body;

    // Find connection and verify ownership
    const connection = await Connection.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!connection) {
      return res.status(404).json({
        status: 'error',
        message: 'Connection not found'
      });
    }

    // Update fields
    if (name !== undefined) connection.name = name;
    if (company !== undefined) connection.company = company;
    if (position !== undefined) connection.position = position;
    if (email !== undefined) connection.email = email;
    if (linkedin !== undefined) connection.linkedin = linkedin;
    if (status !== undefined) connection.status = status;
    if (notes !== undefined) connection.notes = notes;
    if (tags !== undefined) {
      connection.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    }
    if (lastContact !== undefined) connection.lastContact = lastContact;

    const updatedConnection = await connection.save();

    res.json({
      status: 'success',
      data: {
        connection: {
          id: updatedConnection._id,
          name: updatedConnection.name,
          company: updatedConnection.company,
          position: updatedConnection.position,
          email: updatedConnection.email,
          linkedin: updatedConnection.linkedin,
          dateAdded: updatedConnection.dateAdded,
          lastContact: updatedConnection.lastContact,
          status: updatedConnection.status,
          notes: updatedConnection.notes,
          tags: updatedConnection.tags,
          createdAt: updatedConnection.createdAt,
          updatedAt: updatedConnection.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('Error updating connection:', error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      status: 'error',
      message: 'Server error while updating connection'
    });
  }
});

// @route   DELETE /api/connections/:id
// @desc    Delete a connection
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const connection = await Connection.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    
    if (!connection) {
      return res.status(404).json({
        status: 'error',
        message: 'Connection not found'
      });
    }

    res.json({
      status: 'success',
      message: 'Connection deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting connection:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error while deleting connection'
    });
  }
});

module.exports = router; 