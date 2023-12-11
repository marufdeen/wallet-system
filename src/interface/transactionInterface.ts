import { Request, Response } from "express";
import {
  ClientSession,
  ClientSessionOptions,
  SaveOptions,
  Types,
} from "mongoose";

export interface ITransaction {
  senderId?: Types.ObjectId;
  userId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  amount: number;
  reference: string;
  transactionType: string;
}

export interface ITransactionData {
  _id: Types.ObjectId;
  senderId?: Types.ObjectId;
  userId: Types.ObjectId;
  receiverId?: Types.ObjectId;
  amount: number;
  reference: string;
  transactionType: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
}
export type Data = {
  [key: string]: any;
};
export interface IResponseData {
  status: number;
  message: string;
  data: Data;
}
