import jwt from "jsonwebtoken";

const generateTokenAndSetCookiesAdmin = (userId, res) => {
  try {
    const token = jwt.sign(
      { userId, role: "admin" },
      process.env.JWT_SECRET_ADMIN,
      {
        expiresIn: "15d",
      }
    );

    res.cookie("jwt_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
  }
};

export default generateTokenAndSetCookiesAdmin;
