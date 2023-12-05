import { Request, Response } from 'express';
import { userServices } from './user.service';
import UserValidationSchema from './user.validation';

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
      error: error,
    });
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'User not found',
      data: error,
    });
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  const { userId: userIdStr } = req.params;
  const userId = parseInt(userIdStr);

  try {
    const result = await userServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: error,
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
};
