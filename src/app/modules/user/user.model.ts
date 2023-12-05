import { Schema, model } from 'mongoose';

const studentSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  fullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: Array,
  address: {
    street: String,
    city: String,
    country: String,
  },
});

const User = model('user', studentSchema);
export default User;
