import { Application, Router } from "express";
import userRoute from "./userRoutes";
//import transactionRoute from "./transactionRoute";
import walletRoutes from "./walletRoutes";
const getRoutes = (app: Application) => {
  const routes: Array<Router> = [userRoute, walletRoutes];
  routes.map((route) => app.use(route));
};

export default getRoutes;
