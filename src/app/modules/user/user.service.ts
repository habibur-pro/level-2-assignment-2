import { TSingleOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  const result = await User.create({ ...userData });
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select(
    'username fullName email age address',
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.isExistUser(userId);
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

const updateUserInDB = async (userId: number, updateData: TUser) => {
  if (!(await User.isExistUser(userId))) {
    throw new Error('User not found');
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { ...updateData },
    { new: true },
  );
  return result;
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await User.isExistUser(userId))) {
    throw new Error('User not found');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

// create new order
const createNewOrderIntoDB = async (
  userId: number,
  orderData: TSingleOrder,
) => {
  const user = await User.isExistUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const result = User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } },
    { new: true },
  );
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  createNewOrderIntoDB,
};
