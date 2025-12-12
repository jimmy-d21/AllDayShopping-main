import jwt from "jsonwebtoken";

const adminUser = (req, res, next) => {
  const token = req.cookies.jwt_admin;
  if (!token) return res.status(401).json({ error: "Please login first" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_ADMIN);

    // Ensure user is admin
    if (decoded.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized: Admins only" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    return res.status(401).json({ error: "Invalid token" });
  }
};

export default adminUser;
