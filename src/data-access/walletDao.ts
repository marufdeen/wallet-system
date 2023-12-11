import { Types } from "mongoose";
import { IWallet, IWalletData, IWalletTf, IWalletDataSave } from "../interface/walletInterface";
import walletModel from "../models/walletModel";

class WalletRepository {
  async createWallet(item: Omit<IWallet, "_id" | "balance">) {
    const result = await walletModel.create(item);
    return result;
  }

  async findByUser(userId: Types.ObjectId): Promise<IWalletData | null> {
    return await walletModel.findOne({ userId });
  }

  async findByUserWithSave(
    user: Types.ObjectId
  ): Promise<IWalletDataSave | null> {
    return await walletModel.findOne({ user });
  }

  async updateWallet(user: IWalletTf): Promise<IWalletData | null> {
    return await walletModel.findOneAndUpdate(
      { user: user.user },
      { balance: user.balance },
      {
        new: true,
      }
    );
  }
}

export default new WalletRepository();
