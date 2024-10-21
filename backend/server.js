const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authController = require('./controllers/authController');
const cors = require('cors');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use('/api/auth', authController);

// Helper functions for blood type conversion
function convertToBloodTypeEnum(bloodGroup) {
  const mapping = {
    'A+': 'A_POSITIVE',
    'A-': 'A_NEGATIVE',
    'B+': 'B_POSITIVE',
    'B-': 'B_NEGATIVE',
    'AB+': 'AB_POSITIVE',
    'AB-': 'AB_NEGATIVE',
    'O+': 'O_POSITIVE',
    'O-': 'O_NEGATIVE'
  };
  return mapping[bloodGroup.toUpperCase()] || null;
}

function convertFromBloodTypeEnum(bloodTypeEnum) {
  const mapping = {
    A_POSITIVE: 'A+',
    A_NEGATIVE: 'A-',
    B_POSITIVE: 'B+',
    B_NEGATIVE: 'B-',
    AB_POSITIVE: 'AB+',
    AB_NEGATIVE: 'AB-',
    O_POSITIVE: 'O+',
    O_NEGATIVE: 'O-'
  };
  return mapping[bloodTypeEnum] || '';
}

// Custom error class for API errors
class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError';
  }
}

// Donor search route
app.post('/api/donors/find', async (req, res, next) => {
  try {
    const { bloodGroup } = req.body;
    if (!bloodGroup) {
      throw new APIError('Blood group is required', 400);
    }

    const bloodTypeEnum = convertToBloodTypeEnum(bloodGroup);
    if (!bloodTypeEnum) {
      throw new APIError(`Invalid blood group: ${bloodGroup}`, 400);
    }

    const donors = await prisma.user.findMany({
      where: {
        bloodType: bloodTypeEnum
      },
      select: {
        id: true,
        name: true,
        bloodType: true,
        email: true,
        location: true
      }
    });

    const formattedDonors = donors.map(donor => ({
      ...donor,
      bloodGroup: convertFromBloodTypeEnum(donor.bloodType),
      contact: donor.email
    }));

    res.json(formattedDonors);
  } catch (error) {
    next(error); // Pass error to error handling middleware
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);

  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        status: err.statusCode
      }
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({
      error: {
        message: 'Database operation failed',
        details: err.message,
        code: err.code
      }
    });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: {
        message: 'Invalid data provided to the database',
        details: err.message
      }
    });
  }

  // Generic error handler
  res.status(500).json({
    error: {
      message: 'An unexpected error occurred',
      details: process.env.NODE_ENV === 'production' ? null : err.message
    }
  });
});

// 404 Not Found middleware
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      details: `The requested resource '${req.originalUrl}' was not found on this server.`
    }
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
