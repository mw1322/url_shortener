import { getUser } from "../service/auth.js";

async function restrictToLoggedinUserOnly(req, res, next) {
//   console.log(req);

  const userUid = req.headers["authorization"].split("Bearer ")[1];
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");
//   console.log(req.user);

  req.user = user;
  next();
}
async function checkAuth(req, res, next) {
  console.log(req.headers["authorization"].split("Bearer")[1]);

  const userUid = req.headers["authorization"].split("Bearer ")[1];

  const user = getUser(userUid);

  //   console.log(req.user);

  req.user = user;
  next();
}

export { restrictToLoggedinUserOnly, checkAuth };
