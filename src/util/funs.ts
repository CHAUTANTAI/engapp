export const getDetailRoute = (id: string | number, route: string) =>
  `${route}/${id}`;
import { clsx } from "clsx";
export const cn = clsx;

import SHA256 from "crypto-js/sha256";

export const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};
