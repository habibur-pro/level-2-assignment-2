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

// get all order

const getUserAllOrderFromDB = async (userId: number) => {
  const user = await User.isExistUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.findOne({ userId }, { _id: 0, orders: 1 });
  return result;
};

// calculate total price or orders
const calculateTotalPriceOfOrder = async (userId: number) => {
  const user = await User.isExistUser(userId);
  if (!user) {
    throw new Error('User not found');
  }
  const result = await User.aggregate([
    { $match: { userId: userId } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: { _id: 0 },
    },
  ]);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
  createNewOrderIntoDB,
  getUserAllOrderFromDB,
  calculateTotalPriceOfOrder,
};
