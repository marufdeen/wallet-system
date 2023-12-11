import { Types } from "mongoose";
import { IUser } from "../interface/userInterface";
import UserModel from "../models/userModel";

class UserDao {
  static async createUser(userData: Omit<IUser, "_id">) {
    const result = await UserModel.create(userData);
    return result;
  }
  static async update(userId: Types.ObjectId, userData: Pick<IUser, "wallet">) {
    const edit = await UserModel.updateOne({ _id: userId }, userData);
    if (edit) return this.findById(userId);
    return false;
  }
  static async findById(id: Types.ObjectId) {
    return await UserModel.findById(id, { password: 0 });
  }

  static async findUser(_id: Types.ObjectId) {
    return await UserModel.findOne({ id: _id }, { password: 0 });
  }

  static async findByEmail(email: string): Promise<IUser | null> {
    return await UserModel.findOne({ email });
  }

  static async findByAccountNumber(
    accountNumber: number
  ): Promise<IUser | null> {
    return await UserModel.findOne({ accountNumber });
  }
}

export default UserDao;
