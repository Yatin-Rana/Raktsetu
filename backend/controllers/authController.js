// authController.js


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUserSchema, loginSchema } = require('../src/schema/userSchema');
const express = require('express');
const { ZodError } = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();


// Initialize PrismaClient

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, bloodType, location } = createUserSchema.parse(req.body);

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                bloodType, // This is now directly the enum value
                location
            }
        });

        res.status(201).json({ message: "User registered successfully", userId: user.id });

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(409).json({ error: 'Email already in use' });
        }
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error during registration' });
    }
});


// Signin route
router.post('/signin', async (req, res) => {
    try {
        console.log('Received signin request');

        const { email, password } = loginSchema.parse(req.body);

        console.log('Finding user');
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

        console.log('Verifying password');
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        console.log('Generating token');
        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Remove sensitive information before sending the response
        const { password: _, ...userWithoutPassword } = user;

        console.log('Login successful');
        res.json({
            message: "Login successful",
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Detailed login error:', error);
        if (error instanceof ZodError) {
            return res.status(400).json({ error: 'Validation error', details: error.errors });
        }
        res.status(500).json({ error: 'Internal server error during login' });
    }
});

module.exports = router;
