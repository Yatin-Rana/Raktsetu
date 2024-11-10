const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authController = require('./controllers/authController');
const cors = require('cors');
const authenticateToken = require('./middlewares/authenticateToken')

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:5173',  // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
};

app.use(cors(corsOptions));  // Enable CORS with the defined options

// Handle Preflight OPTIONS requests
app.options('*', cors(corsOptions));  //

app.get('/test', (req, res) => {
  res.json({ message: 'Test route working' });
});
app.post('/api/blood-camps', async (req, res) => {
  const { organizerName, phone, location, campDate, expectedDonors, additionalInfo } = req.body;

  try {
    // Ensure `campDate` is a valid Date or ISO-8601 string, and `expectedDonors` is a number
    const newCamp = await prisma.camp.create({
      data: {
        organizerName,
        phone,
        location,
        campDate: new Date(campDate),  // Ensure campDate is a Date object
        expectedDonors: Number(expectedDonors),  // Convert expectedDonors to a number
        additionalInfo,
      },
    });
    
    res.status(201).json(newCamp);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create blood camp' });
  }
});
app.put('/profile', async (req, res) => {
  console.log('Query Params:', req.query);
  const { userId } = req.query; // Extract userId from the query string
  const { name, email, bloodType, location } = req.body;

  // Validate that all fields are provided
  if (!userId || !name || !email || !bloodType || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
      // Attempt to update the user profile
      const updatedUser = await prisma.user.update({
          where: { id: parseInt(userId) }, // Use userId from query to find the user
          data: { name, email, bloodType, location },
      });

      return res.status(200).json(updatedUser); // Return updated user data
  } catch (err) {
      console.error('Error updating profile:', err);
      return res.status(500).json({ error: 'Error updating profile' });
  }
});

app.get('/api/bloodcamps', async (req, res) => {
  try {
    const camps = await prisma.camp.findMany(); // Fetch all scheduled camps
    res.json(camps);
  } catch (error) {
    console.error('Error fetching scheduled camps:', error);
    res.status(500).json({ error: 'Failed to fetch scheduled camps' });
  }
});


app.get('/profile', async (req, res) => {
  try {
    const userId = parseInt(req.query.userId);
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true,
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/api/hospitals', async (req, res) => {
  try {
    const hospitals = await prisma.hospital.findMany({
      select: {
        id: true,
        name: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        email: true,
        website: true,
        capacity: true
      }
    });
    res.json(hospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'An error occurred while fetching hospitals' });
  }
});

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
        location: true,
        mobile: true
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


// app.get('/api/hospitals', async (req, res) => {
//   try {
//     const hospitals = await prisma.hospital.findMany({
//       select: {
//         id: true,
//         name: true,
//         address: true,
//         city: true,
//         state: true,
//         zipCode: true,
//         phone: true,
//         email: true,
//         website: true,
//         capacity: true,
//         // bloodBank: {
//         //   select: {
//         //     name: true
//         //   }
//         // }
//       }
//     });
//     res.json(hospitals);
//   } catch (error) {
//     console.error('Error fetching hospitals:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });


app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
      select: {
        id: true,
        name: true,
        email: true,
        bloodType: true,
        location: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal server error while fetching profile' });
  }
});



// Route to fetch hospital by ID with selected fields
// server.js or app.js (Backend)
// app.get('/api/hospitals', async (req, res) => {
//   try {
//     const hospitals = await prisma.hospital.findMany({
//       include: {
//         bloodBank: true, // Include bloodBank information if needed
//       },
//       select: {
//         id: true,
//         name: true,
//         address: true,
//         city: true,
//         state: true,
//         zipCode: true,
//         phone: true,
//         email: true,
//         website: true,
//         capacity: true,
//         // bloodBankId: true, // You can return bloodBankId if needed for the frontend
//         createdAt: true,
//         updatedAt: true,
//       },
//     });

//     res.json(hospitals); // Send the hospital data as JSON response
//   } catch (error) {
//     console.error('Error fetching hospitals:', error);
//     res.status(500).json({ error: 'An error occurred while fetching hospitals', details: error.message });
//   }
// });


app.get('/donations/history/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Query the Donation table and fetch donations related to the given user
    const donations = await prismaClient.donation.findMany({
      where: {
        userId: parseInt(userId), // Ensure userId is an integer
      },
      orderBy: {
        donationDate: 'desc', // You can change this to 'asc' for oldest first
      },
    });

    // Check if the user has any donations
    if (donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this user' });
    }

    // Respond with the donation history
    return res.status(200).json(donations);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    return res.status(500).json({ message: 'Failed to fetch donation history' });
  }
});


// Example Express endpoint for submitting camp details

// Assuming you're using Express and Prisma for database operations

app.delete('/profile', async (req, res) => {
  try {
      const { userId } = req.query;  // Get the userId from the query parameters

      if (!userId) {
          return res.status(400).json({ error: "User ID is required" });
      }

      // Delete user from the database using Prisma
      const deletedUser = await prisma.user.delete({
          where: { id: Number(userId) },  // Ensure userId is a number
      });

      if (!deletedUser) {
          return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
      console.error('Profile deletion error:', error);
      res.status(500).json({ error: 'Internal server error while deleting profile' });
  }
});



// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
const PORT = process.env.PORT || 3006;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
