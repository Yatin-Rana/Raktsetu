// authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserSchema, loginSchema } = require('../src/schema/userSchema');
const express = require('express');
const { ZodError } = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();
// const authenticateToken = require('../middlewares/authenticateToken');



// dependencies

const bloodTypeMapping = {
  'A+': 'A_POSITIVE',
  'A-': 'A_NEGATIVE',
  'B+': 'B_POSITIVE',
  'B-': 'B_NEGATIVE',
  'AB+': 'AB_POSITIVE',
  'AB-': 'AB_NEGATIVE',
  'O+': 'O_POSITIVE',
  'O-': 'O_NEGATIVE'
};

// Sign up route
router.post('/signup', async (req, res) => {
  try {
    let { name, email, password, bloodType, location, mobile } = req.body;

    // Map shorthand blood type to full name
    if (bloodType) {
      bloodType = bloodTypeMapping[bloodType];
    }

    // Ensure bloodType is valid
    if (!bloodType) {
      return res.status(400).json({ error: 'Invalid blood type' });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        bloodType,
        location,
        mobile
      }
    });

    // Generate JWT token (replace 'your_jwt_secret' with your actual secret)
    // const token = jwt.sign({ userId: user.id, email: user.email }, 'yatin', { expiresIn: '1h' });

    // Send response with user and token
    res.status(201).json({
      message: "Sign-up successful",
      // token,
      user: { id: user.id, name: user.name, email: user.email } ,
      // redirectTo: '/joinus' // Return user details as expected by frontend
    });
  } catch (error) {
    // console.error('Received blood type:', bloodType);  // Log the bloodType
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});


router.post('/signin', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        bloodType: true,
        location: true
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    const name = user.name;
    const userId = user.id;

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
      name,
      userId
    });

  } catch (error) {
    console.error('Detailed login error:', error);
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', details: error.errors });
    }
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// New profile route

module.exports = router;
