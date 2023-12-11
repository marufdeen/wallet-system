import { SHA256 } from "crypto-js";

export function generateUniqueNumber(): number {
    const randomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    const data = `${Date.now()}${randomNumber}`;
    const hashedData = SHA256(data).toString();
    const uniqueNumberString = hashedData.substring(0, 10);
    const uniqueNumber = parseInt(uniqueNumberString, 16);

    return uniqueNumber;
  }