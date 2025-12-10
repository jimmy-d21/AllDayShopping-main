import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "15d",
    });

    res.cookie("jwt", token, {
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

export default generateTokenAndSetCookies;
