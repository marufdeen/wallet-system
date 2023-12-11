import { Request, Response, NextFunction } from "express";
import { CustomRequest, UserJWT } from "../interface/userInterface";
import jwtToken from "../helpers/jwtToken";

class AuthMiddleware {
  static verifyToken(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const header: any = req.header("Authorization");
      if (!header) {
        return res.status(401).send({ message: "No bearer token provided" });
      }
      const token = header.split(" ")[1];
      if (!token)
        return res
          .status(401)
          .send({ message: "Access Denied: No token provided" });
      req.user = jwtToken.verifyToken(
        token,
        process.env.JWT_SECRET as string
      ) as UserJWT;
       next();
    } catch (err) {
      res.status(400).send({ message: "Invalid token" });
    }
  }

 static checkParams(req: CustomRequest, res: Response, next: NextFunction) {
    const reference = req.query.reference;
    if (!reference) {
      return res
        .status(400)
        .send({ message: "No reference to validate transaction" });
    }
    next();
  }

  static checkEmailParams(req: CustomRequest, res: Response, next: NextFunction) {
    const reference = req.query.email;
    if (!reference) {
      return res.status(400).send({ message: "No email passed" });
    }
    next();
  }

  static checkAccountNumberParams(
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    const accountNumber = req.query.accountNumber;
    if (!accountNumber) {
      return res.status(400).send({ message: "Account number not passed" });
    }
    next();
  }
}

export default AuthMiddleware;
