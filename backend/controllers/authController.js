const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

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

router.post('/signup', async (req, res) => {
  try {
    let { name, email, password, bloodType, location, mobile } = req.body;

    if (bloodType) {
      bloodType = bloodTypeMapping[bloodType];
    }

    if (!bloodType) {
      return res.status(400).json({ error: 'Invalid blood type' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, bloodType, location, mobile }
    });

    res.status(201).json({
      message: "Sign-up successful",
      user: { id: user.id, name: user.name, email: user.email }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration' });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, name: true, bloodType: true, location: true }
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      message: "Login successful",
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

module.exports = router;