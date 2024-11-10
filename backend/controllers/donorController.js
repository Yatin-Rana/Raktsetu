const jwt = require('jsonwebtoken');
const { createUserSchema, loginSchema } = require('../src/schema/userSchema');
const express = require('express');
const { ZodError } = require('zod');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

// controllers/donorController.js

const donorController = {
  findDonors: async (req, res) => {
    try {
      const { bloodGroup } = req.body; // Read from request body
      if (!bloodGroup) {
        return res.status(400).json({ message: 'Blood group is required' });
      }

      // Convert frontend blood group format to Prisma enum format
      const bloodTypeEnum = convertToBloodTypeEnum(bloodGroup);

      const donors = await prisma.user.findMany({
        where: {
          bloodType: bloodTypeEnum
        },
        select: {
          id: true,
          name: true,
          bloodType: true,
          email: true, // Using email as contact
          location: true
        }
      });

      // Convert Prisma enum back to frontend format
      const formattedDonors = donors.map(donor => ({
        ...donor,
        bloodGroup: convertFromBloodTypeEnum(donor.bloodType),
        contact: donor.email // Using email as contact
      }));

      res.json(formattedDonors);
    } catch (error) {
      console.error('Error searching donors:', error);
      res.status(500).json({ message: 'Error searching donors' });
    }
  }
};

// Helper functions remain unchanged...

module.exports = donorController;
