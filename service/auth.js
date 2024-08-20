import jwt from "jsonwebtoken";
const secretKey = "Manish123@12";
function setUser(user) {
  return jwt.sign(
    {
      _id:user._id,
      username: user.name,
      email: user.email,
      role:user.role
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
}
function getsessionId() {
  return sessionIdToUserMap;
}
export { setUser, getUser, getsessionId };
