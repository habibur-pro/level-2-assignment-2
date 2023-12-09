import { Schema, model } from 'mongoose';
import { TUserModel, TUser } from './user.interface';
import bcrypt from 'bcrypt';

const OrderSchema = {
  productName: String,
  price: Number,
  quantity: Number,
};

const UserSchema = new Schema<TUser, TUserModel>({
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
  orders: {
    type: [OrderSchema],
    default: [],
  },
});

UserSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

// studentSchema.post('save', async function (doc) {
//   doc.password = '';
// });

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret['password'];
    return ret;
  },
});
UserSchema.statics.isExistUser = async function (userId: number) {
  const existingUser = await User.findOne({ userId });
  return existingUser;
};

export const User = model<TUser, TUserModel>('user', UserSchema);
