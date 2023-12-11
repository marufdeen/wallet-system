import { Types } from "mongoose";
import {
  ITransaction,
  ITransactionData,
} from "../interface/transactionInterface";
import TransactionModel from "../models/transactionModel";

class TransactionRepository {
 static async createTransaction(item: ITransaction): Promise<ITransactionData> {
    const result = await TransactionModel.create(item);
    return result;
  }

  static async findByUserId(id: Types.ObjectId): Promise<ITransactionData[]> {
    return await TransactionModel.find({ userId: id })
      .populate({ path: "senderId userId receiverId", select: "-password" })
      .lean();
  }

  static async findByReference(reference: string): Promise<ITransactionData | null> {
    return await TransactionModel.findOne({ reference });
  }
}

export default TransactionRepository;
