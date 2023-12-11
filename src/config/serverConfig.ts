import { config } from "dotenv";
config();
export default {
  appName: process.env.APP_NAME,
  port: process.env.PORT || 5000,
  url: process.env.APP_URL || "http://localhost",
  enviroment: process.env.APP_ENV || "development",
};
