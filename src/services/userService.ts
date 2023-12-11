import { IUser } from "../interface/userInterface";
import userDao from "../data-access/userDao";
import { comparePassword } from "../helpers/password";
import token from "../helpers/jwtToken";
import { generateUniqueNumber } from "../helpers/randomNumber";
import userEntity from "../entities/userEntity";
import walletService from "./walletService";

class UserService {
  async register(userData: IUser) {
    try {
      // make a new user entity and validate the inputed details
      const entity: any = await new userEntity(userData).execute();
      if (entity.details) throw new Error(entity.details[0].message);

      const userExist = await userDao.findByEmail(userData.email);
      if (userExist) {
        throw new Error("User already exists");
      }
      const userCreated = await userDao.createUser({
        ...entity.userData,
        accountNumber: generateUniqueNumber(),
      });
     const walletCreated = await walletService.create({ userId: userCreated._id });

    await userDao.update(userCreated._id, { wallet: walletCreated._id });
      const accessToken = token.createToken(userCreated._id, userCreated.email)
    
      return {
        userCreated,
        accessToken,
      };
    } catch (error: any) {
      // throw { error: error.message };
      throw error;
    }
  }

  async login(userData: IUser) {
    try {
      // make a new user entity and validate the inputed details
      const entity: any = await new userEntity(userData).validateLogin();
      if (entity.details) return { error: entity.details[0].message };

      const userExist = await userDao.findByEmail(userData.email);
      if (!userExist) throw new Error("Invalid Credentials");

      await comparePassword(userData.password, userExist.password);
      const userFound = await userDao.findUser(userData._id);
      // generate token for the logged-in user
      const accessToken = token.createToken(userExist._id, userExist.email);
      return { sucess: "Login Successful", userFound, accessToken };
    } catch (error: any) {
      throw error;
    }
  }
  async myProfile(_id: any) {
    try {
      const userFound = await userDao.findById(_id);
      return { sucess: "Data Found Successfully", userFound };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export default new UserService();
