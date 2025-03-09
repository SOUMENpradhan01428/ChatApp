import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const createTokenAndSaveCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_TOKEN, {
    expiresIn: "10d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // xss
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: "None", // csrf
    path: "/",
  });
};
export default createTokenAndSaveCookie;
