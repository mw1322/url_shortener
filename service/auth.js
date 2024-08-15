import jwt from "jsonwebtoken";
const secretKey = "Manish123@12";
function setUser(user) {
  return jwt.sign(
    {
      username: user.name,
      email: user.email,
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
