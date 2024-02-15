import jwt from "jsonwebtoken";

const SECRET_TOKEN = process.env.SECRET_TOKEN;

export const checkData = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password required." });
  if (typeof email !== "string")
    return res.status(400).json({ message: "Email should be a string." });
  if (typeof password !== "string")
    return res.status(400).json({ message: "Password should be a string." });
  next();
};

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("auth try", authHeader)
  if (!authHeader)
    return res.status(401).json({ message: "Authorization header required." });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token required." });

  try {
    const user = jwt.verify(token, SECRET_TOKEN, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token." });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid token." });
  }
};
