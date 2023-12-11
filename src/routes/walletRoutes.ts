import { Router } from "express";
import WalletValidator from "../helpers/walletValidator";
import RequestBodyMiddleware from "../middlewares/requestbody";
import WalletController from "../controllers/walletController";
import AuthMiddleware from "../middlewares/auth";

const router = Router();

router
  .route("/mywallet")
  .get(AuthMiddleware.verifyToken, WalletController.getMyWallet);
router
  .route("/transfer")
  .post(
    RequestBodyMiddleware.validate(WalletValidator.transfer()),
    AuthMiddleware.verifyToken,
    WalletController.transfer
  );
router
  .route("/fund")
  .post(
    RequestBodyMiddleware.validate(WalletValidator.fund()),
    AuthMiddleware.verifyToken,
    WalletController.fund
  );
router
  .route("/verifyfunds")
  .get(AuthMiddleware.checkParams, WalletController.verifyPayment);

export default router;
