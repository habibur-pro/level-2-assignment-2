import { z } from 'zod';

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: z.object({
    firstName: z.string(),
    lastName: z.string(),
  }),
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
});

export default UserValidationSchema;