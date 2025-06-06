import SHA256 from "crypto-js/sha256";

import { clsx } from "clsx";

export const getDetailRoute = (id: string | number, route: string) =>
  `${route}/${id}`;

export const cn = clsx;

export const hashPassword = (password: string): string => {
  return SHA256(password).toString();
};
