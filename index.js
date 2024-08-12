import express from "express";
import connectDb from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
connectDb();
import path from "path";
import URL from "./models/url.js";
const app = express();


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const PORT = process.env.port || 8001;

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`);
});



//Routes;

import urlRoute from "./routes/url.js";
import staticRouter from "./routes/staticRouter.js"
app.use("/url", urlRoute);
app.use("/",staticRouter);
