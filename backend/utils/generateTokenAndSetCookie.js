import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true, // client-side JavaScript cannot access the cookie (XSS protection)
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // cookie will only be sent in a first-party context
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
