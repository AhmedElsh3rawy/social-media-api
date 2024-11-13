import jwt from "jsonwebtoken";

export const creatAccessToken = async (userId) => {
  return await jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1h",
  });
};

export const creatRefreshToken = async (userId) => {
  return await jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = async (token) => {
  return await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = async (token) => {
  return await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};
