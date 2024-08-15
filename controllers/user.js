import User from "../models/user.js";
import { v4 as uuidv4 } from "uuid";
import { getsessionId, setUser } from "../service/auth.js";

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.render("home");
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "Invalid Username or Password",
    });
  const token = setUser(user);
  // res.cookie("uid", token);
  // console.log(req.us);
  // return res.redirect("/");
  return res.json({
    token : token
  });
}

export { handleUserSignUp, handleUserLogin };
