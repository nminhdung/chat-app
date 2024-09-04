import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).send("You are no authenticated!");
  }
  jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
    if (err) return response.status(403).send("Token is not valid");
    req.userId = decode.userId;
    next();
  });
};
