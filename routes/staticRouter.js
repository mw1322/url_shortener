import express from "express";
import URL from "../models/url.js";
import { roleCheck } from "../middlewares/auth.js";
import User from "../models/user.js";
const router = express.Router();

router.get("/admin/urls",roleCheck(["Admin"]), async (req, res) => {
  console.log(req.user);
  const allURLS = await URL.find({}).populate("createdBy");
  return res.render("home", {
    urls: allURLS
  });
  // console.log(awa)
});

router.get("/",roleCheck(["Normal","Admin"]), async (req, res) => {
  console.log(req.user);
  const allURLS = await URL.find({ createdBy: req.user._id });
  return res.render("home", {
    urls: allURLS,
  });
});

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/login", (req, res) => {
  return res.render("login");
});

export default router;
