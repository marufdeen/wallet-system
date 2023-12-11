import { Request, Response } from "express";
import {
  ClientSession,
  ClientSessionOptions,
  SaveOptions,
  Types,
} from "mongoose";

export interface IWalletData {
  user: Types.ObjectId;
  balance: number;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  _id: Types.ObjectId;
}

export interface IWalletDataSave {
  user: Types.ObjectId;
  balance: number;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  _id: Types.ObjectId;
  save(options?: SaveOptions): Promise<this>;
}

export interface IWalletDataSaveWithSession {
  user: Types.ObjectId;
  balance: number;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  _id: Types.ObjectId;
  save(options?: SaveOptions): Promise<this>;
  session?: any;
}

export interface IWallet {
  userId: Types.ObjectId;
  balance: number;
  _id: Types.ObjectId;
}

export interface IWalletTf {
  user: Types.ObjectId;
  balance: number;
}

export type Data = {
  [key: string]: any;
};
export interface IResponseData {
  status: number;
  message: string;
  data: Data;
}
export type WalletTransfer = {
  accountNumber: number;
  amount: number;
};

export type WalletTransferEmail = {
  email: string;
  amount: number;
};
