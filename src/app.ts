import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dbConnect from "./config/dataBaseConnection";
import  initializeRoutes from "./routes"

const app = express();
app.use(cors());
dbConnect();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Log API Endpoints
app.use(morgan("dev"));

// Routes for the end-points
initializeRoutes(app);

// Default route definition
app.get("/", (req, res) => res.send("Welcome to a Wallet System Application."));
export default app;
