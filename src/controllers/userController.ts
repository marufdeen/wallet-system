import { Request, Response } from "express";
import { CustomRequest } from "../interface/userInterface";
import userService from "../services/userService";
import { IUser } from "../interface";

class UserController {
  /**
   * @author Maruf
   * @method  POST - register
   * @desc Feature: signs up the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async register(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.register(req.body);
      res.status(201).send({
        success: true,
        message: "User successfully created",
        data: response,
      });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ Error: err.message });
    }
  }

  /**
   * @author Maruf
   * @method  POST - login
   * @desc Feature: signs in the user
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const response = await userService.login(req.body);
      res
        .status(200)
        .send({ success: true, message: "login successful", data: response });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ Error: err.message });
    }
  }

  /**
   * @author Maruf
   * @method  GET - verifyPayment
   * @desc Feature: validates payment after being received
   * @param {object} req Request object
   * @param {object} res Response object
   * @returns {object} Json data
   */
  static async myProfile(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { user } = req; 
      const response = await userService.myProfile(user?._id);
      res.status(200).send({
        success: true,
        message: "Fetch sucessfully",
        data: response,
      });
    } catch (err: any) {
      const status = err.status ? err.status : 400;
      res.status(status).send({ message: err.message, data: null });
    }
  }

  // /**
  //  * @author Maruf
  //  * @method  GET - verifyPayment
  //  * @desc Feature: validates payment after being received
  //  * @param {object} req Request object
  //  * @param {object} res Response object
  //  * @returns {object} Json data
  //  */
  // async getByEmail(req: CustomRequest, res: Response): Promise<void> {
  //   try {
  //     const userId = req.query.email;
  //     const response = await userService.getEmailWithoutPassword(
  //       userId as string
  //     );
  //     res
  //       .status(200)
  //       .send({ success: true, message: "Fetch sucessfully", data: response });
  //   } catch (err: any) {
  //     const status = err.status ? err.status : 400;
  //     res.status(status).send({ message: err.message, data: null });
  //   }
  // }

  // /**
  //  * @author Maruf
  //  * @method  GET - verifyPayment
  //  * @desc Feature: validates payment after being received
  //  * @param {object} req Request object
  //  * @param {object} res Response object
  //  * @returns {object} Json data
  //  */
  // async getByAccount(req: CustomRequest, res: Response): Promise<void> {
  //   try {
  //     const userId = req.query.accountNumber;
  //     const response = await userService.getOneByAccountNumber(
  //       parseInt(userId as string) as number
  //     );
  //     res
  //       .status(200)
  //       .send({ success: true, message: "Fetch sucessfully", data: response });
  //   } catch (err: any) {
  //     const status = err.status ? err.status : 400;
  //     res.status(status).send({ message: err.message, data: null });
  //   }
  // }
}

export default UserController;
