import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserValidationSchema from './user.validation';

// create new user
const createUser = async (req: Request, res: Response) => {
  const userData = req.body;
  const parseResult = UserValidationSchema.safeParse(userData);

  if (!parseResult.success) {
    return res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: parseResult.error,
    });
  }

  try {
    const result = await userServices.createUserIntoDB(parseResult.data);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: {
        code: 404,
        description: 'User not created',
      },
    });
  }
};
// get all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// get user by userId
const getSingleUser = async (req: Request, res: Response) => {
  const { userId: userIdStr } = req.params;
  const userId = parseInt(userIdStr);
  try {
    const result = await userServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// update user

const updateUser = async (req: Request, res: Response) => {
  const updateDate = req.body;
  const { userId: userIStr } = req.params;
  const userId = parseInt(userIStr);

  try {
    const result = await userServices.updateUserInDB(userId, updateDate);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const { userId: userIdStr } = req.params;
  const userId = parseInt(userIdStr);
  try {
    await userServices.deleteUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

// const create order
const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { userId: userIdStr } = req.params;
    const userId = parseInt(userIdStr);
    const oderData = req.body;
    const result = await userServices.createNewOrderIntoDB(userId, oderData);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found',
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateUser,
  deleteUser,
  createNewOrder,
};
