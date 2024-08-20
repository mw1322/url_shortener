import { getUser } from "../service/auth.js";

async function checkForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;

  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
// console.log(user);
  req.user = user;
  return next();
}

function roleCheck(roles = []) {
  return async function (req, res, next) {
    const role = req.user?.role;
    // console.log(req.user);
    if (!role || !roles.includes(role)) {
      return res.end("unauthorized");
    }
    next();
  };
}

export { checkForAuthentication, roleCheck };
