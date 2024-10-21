const z = require('zod');



const createUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  bloodType: z.enum(['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE']),
  location: z.string().optional()
});

// ... rest of your schema


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  bloodType: z.enum(['A_POSITIVE', 'A_NEGATIVE', 'B_POSITIVE', 'B_NEGATIVE', 'AB_POSITIVE', 'AB_NEGATIVE', 'O_POSITIVE', 'O_NEGATIVE']).optional(),
  location: z.string().optional()
});

module.exports= {
  createUserSchema,
  loginSchema,
  updateUserSchema
};
