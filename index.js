import express from "express";
import cookieParser from "cookie-parser";
import connectDb from "./db/index.js";
import dotenv from "dotenv";
import urlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js";
import userRoute from "./routes/user.js";
dotenv.config({
  path: "./.env",
});
connectDb();
import path from "path";
import URL from "./models/url.js";
import { checkAuth, restrictToLoggedinUserOnly } from "./middlewares/auth.js";
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.port || 8001;

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});

//Routes;

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRouter);
