import { z } from 'zod';

const OrderValidationSchema = z.object({
  productName: z.string().trim(),
  price: z.number(),
  quantity: z.number(),
});

const UserValidationSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z
    .string()
    .min(8, { message: 'password must be 8 character' })
    .max(16, { message: 'password must be lower the 16 character' }),
  fullName: z.object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  }),
  age: z.number(),
  email: z.string().email().trim(),
  isActive: z.boolean(),
  hobbies: z.string().array(),
  address: z.object({
    street: z.string().trim(),
    city: z.string().trim(),
    country: z.string().trim(),
  }),
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
