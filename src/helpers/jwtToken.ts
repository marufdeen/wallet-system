import { sign, verify } from "jsonwebtoken";
const secret = process.env.JWT_SECRET;
const expires = process.env.JWT_EXPIRE;
import { Types } from "mongoose";

class JwtToken {
  static createToken(id: Types.ObjectId, email: string) {
    return sign({ _id: id, email }, secret as string, {
      expiresIn: expires,
    });
  }

  static verifyToken(token: string, config: string) {
    return verify(token, config);
  }
}

export default JwtToken;
