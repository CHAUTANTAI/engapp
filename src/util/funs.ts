import jwt from "jsonwebtoken";

import SHA256 from "crypto-js/sha256";

import { clsx } from "clsx";

export const getDetailRoute = (id: string | number, route: string) =>
  `${route}/${id}`;

export const cn = clsx;

export const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access-secret";

const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "refresh-secret";

export const generateAccessToken = (payload: object) => {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
