import { Model } from 'mongoose';

export type TSingleOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
  orders?: Array<TSingleOrder>;
};

export interface TUserModel extends Model<TUser | []> {
  // eslint-disable-next-line no-unused-vars
  isExistUser(userId: number): Promise<TUser | null>;
}
