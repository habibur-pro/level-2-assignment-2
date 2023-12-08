import { TUser } from './user.interface';
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
  const user = await User.isExistUser(userId);
  return user;
};

export const userServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
