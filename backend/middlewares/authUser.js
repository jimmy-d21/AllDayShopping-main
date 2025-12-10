import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Please login first" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default authUser;
