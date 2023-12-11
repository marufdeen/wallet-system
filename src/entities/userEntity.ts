import mongoose, { Types } from "mongoose";
import { hashPassword } from "../helpers/password";
import {
  validateUserSignUp,
  validateUserLogin,
} from "../helpers/userValidator";
import { IUser } from "../interface/userInterface";

interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
class userEntity {
  private userData: IUserData;
  private editPassword: any;
  private loginData: any;
  private editData: any;
  private error: any;
  constructor(userData: IUser) {
    const { firstName, lastName, email, password } = userData;

    this.userData = {
      firstName,
      lastName,
      email,
      password,
    };
    this.editData = {
      firstName,
      lastName,
      email,
    };
    this.loginData = {
      email,
      password,
    };
  }

  async _validateSignUp() {
    return validateUserSignUp(this.userData);
  }

  async validateLogin() {
    const { error } = await validateUserLogin(this.loginData);
    if (error) throw error;
    return this;
  }

  async _hashUserPassword() {
    this.userData.password = await hashPassword(this.userData.password);
  }

  async execute() {
    const { error } = await this._validateSignUp();
    if (error) throw error;
    await this._hashUserPassword();
    Object.freeze(this.userData);
    return this;
  }
}

export default userEntity;
