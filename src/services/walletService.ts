import {
  IWallet,
  IWalletTf,
  Data,
  IWalletDataSave,
  WalletTransfer,
  WalletTransferEmail,
} from "../interface/walletInterface";
import WalletDao from "../data-access/walletDao";
import { Types } from "mongoose";
import ErrorMiddleware from "../middlewares/error";
// import { Types, startSession } from "mongoose";
// import userDao from "../data-access/userDao";
// import PaystackService from "./paystack";
// import userService from "../services/userService";
// import TransactionService from "../services/transaction";
// import { v4 as uuidv4 } from "uuid";

class WalletService {
  async create(userData: Omit<IWallet, "_id" | "balance">) {
    let walletExist = await WalletDao.findByUser(userData.userId);
    if (walletExist) {
      throw new Error("wallet already exists for this user");
    }
    return await WalletDao.createWallet({ ...userData });
  }

  async getMyWallet(id: Types.ObjectId){
    const wallet = await WalletDao.findByUser(id);
    if (!wallet) {
      ErrorMiddleware.errorHandler("wallet not found", 404);
    } else {
      return wallet;
    }
  }

  //   async getMyWalletSave(
  //     id: Types.ObjectId
  //   ): Promise<IWalletDataSave | undefined> {
  //     const wallet = await WalletDao.findByUserWithSave(id);
  //     if (!wallet) {
  //       ErrorMiddleware.errorHandler("wallet not found", 404);
  //     } else {
  //       return wallet;
  //     }
  //   }

  //   async fund(id: Types.ObjectId, amount: number): Promise<any> {
  //     const user = await userService.getOneByID(id);
  //     if (user) {
  //       const payload = await PaystackService.initializePayment(
  //         user?.email,
  //         amount
  //       );
  //       return payload;
  //     } else {
  //       ErrorMiddleware.errorHandler("User not found", 404);
  //     }
  //   }

  //   async verifyPayment(reference: string): Promise<any> {
  //     let transaction = await TransactionService.getTransactionsByRef(reference);
  //     if (transaction) {
  //       ErrorMiddleware.errorHandler("Transaction already completed", 400);
  //     }
  //     const payload = await PaystackService.validatePayment(reference);
  //     const getUser = await userService.getOneByEmail(
  //       payload?.data.customer.email
  //     );
  //     if (getUser) {
  //       let wallet = await WalletDao.findByUserWithSave(getUser?._id);
  //       if (wallet) {
  //         wallet.balance += payload?.data.amount / 100;
  //         await wallet.save();
  //         await TransactionService.create({
  //           userId: getUser?._id,
  //           receiverId: getUser?._id,
  //           amount: payload?.data.amount / 100,
  //           reference,
  //           transactionType: "Credit",
  //         });
  //       }
  //     }
  //     return payload;
  //   }

  //   async transfer(userId: Types.ObjectId, data: WalletTransfer): Promise<any> {
  //     const session = await startSession();
  //     session.startTransaction();
  //     let senderWallet = await this.getMyWalletSave(userId);
  //     if (!senderWallet) {
  //       ErrorMiddleware.errorHandler("You don't have a wallet", 404);
  //     }
  //     let recipientInfo = await userDao.findByAccountNumber(data.accountNumber);
  //     if (userId?.toString() === recipientInfo?._id.toString()) {
  //       ErrorMiddleware.errorHandler("Cannot send from the same account", 400);
  //     }
  //     if (!recipientInfo) {
  //       ErrorMiddleware.errorHandler("No user with such accountNumber", 404);
  //     } else {
  //       let recipientWallet = await WalletDao.findByUserWithSave(
  //         recipientInfo._id
  //       );
  //       if (!recipientWallet) {
  //         ErrorMiddleware.errorHandler("Receiver doesn't have a wallet", 404);
  //       }
  //       if (data.amount === 0) {
  //         ErrorMiddleware.errorHandler("Cannot transfer this amount", 400);
  //       }
  //       if (senderWallet && recipientWallet) {
  //         if (senderWallet.balance < data.amount) {
  //           ErrorMiddleware.errorHandler("Insufficient balance", 400);
  //         }
  //         senderWallet.balance -= data.amount;
  //         recipientWallet.balance += data.amount;

  //         // Updating Sender and Recipient Wallet
  //         await senderWallet.save({ session });
  //         await recipientWallet.save({ session });

  //         await session.commitTransaction();
  //         session.endSession();

  //         // Creating Transaction for Sender and Recipient
  //         const trxRef = uuidv4();
  //         await TransactionService.createWithoutRefCheck({
  //           userId,
  //           senderId: userId,
  //           receiverId: recipientInfo._id,
  //           amount: data.amount,
  //           reference: trxRef,
  //           transactionType: "Debit",
  //         });
  //         await TransactionService.createWithoutRefCheck({
  //           userId: recipientInfo._id,
  //           senderId: userId,
  //           receiverId: recipientInfo._id,
  //           amount: data.amount,
  //           reference: trxRef,
  //           transactionType: "Credit",
  //         });

  //         return { message: "Transfer successful" };
  //       }
  //     }
  //   }

  //   async transferWithEmail(
  //     userId: Types.ObjectId,
  //     data: WalletTransferEmail
  //   ): Promise<any> {
  //     const session = await startSession();
  //     session.startTransaction();
  //     let senderWallet = await this.getMyWalletSave(userId);
  //     if (!senderWallet) {
  //       ErrorMiddleware.errorHandler("You don't have a wallet", 404);
  //     }
  //     let recipientInfo = await userDao.findByEmail(data.email);
  //     if (userId === recipientInfo?._id) {
  //       ErrorMiddleware.errorHandler("Cannot send from the same account", 400);
  //     }
  //     if (!recipientInfo) {
  //       ErrorMiddleware.errorHandler("No user with such accountNumber", 404);
  //     } else {
  //       let recipientWallet = await WalletDao.findByUserWithSave(
  //         recipientInfo._id
  //       );
  //       if (!recipientWallet) {
  //         ErrorMiddleware.errorHandler("Receiver doesn't have a wallet", 404);
  //       }
  //       if (data.amount === 0) {
  //         ErrorMiddleware.errorHandler("Cannot transfer this amount", 400);
  //       }
  //       if (senderWallet && recipientWallet) {
  //         if (senderWallet.balance < data.amount) {
  //           ErrorMiddleware.errorHandler("Insufficient balance", 400);
  //         }
  //         senderWallet.balance -= data.amount;
  //         recipientWallet.balance += data.amount;

  //         // Updating Sender and Recipient Wallet
  //         await senderWallet.save({ session });
  //         await recipientWallet.save({ session });

  //         await session.commitTransaction();
  //         session.endSession();

  //         // Creating Transaction for Sender and Recipient
  //         const trxRef = uuidv4();
  //         await TransactionService.createWithoutRefCheck({
  //           userId,
  //           senderId: userId,
  //           receiverId: recipientInfo._id,
  //           amount: data.amount,
  //           reference: trxRef,
  //           transactionType: "Debit",
  //         });
  //         await TransactionService.createWithoutRefCheck({
  //           userId: recipientInfo._id,
  //           senderId: userId,
  //           receiverId: recipientInfo._id,
  //           amount: data.amount,
  //           reference: trxRef,
  //           transactionType: "Credit",
  //         });

  //         return { message: "Transfer successful" };
  //       }
  //     }
  //   }

  // generateUniqueNumber(id: Types.ObjectId): number {
  //     const objectIdString = id.toHexString();
  //     const objectIdInteger = parseInt(objectIdString, 16);
  //     const uniqueNumber = objectIdInteger % 10000000000; // Limit to 10 digits
  //     return uniqueNumber;
  //   }
}

export default new WalletService();
