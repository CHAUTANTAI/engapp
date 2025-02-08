"use client";

import Cookies from "js-cookie";

export const useAuthCookies = () => {
  const setAuthCookie = ({
    token,
    expiresInDays = 7,
  }: {
    token: string;
    expiresInDays?: number;
  }) => {
    Cookies.set("auth_token", token, { expires: expiresInDays, path: "/" });
  };

  const getAuthCookie = () => {
    return Cookies.get("auth_token") || null;
  };

  const removeAuthCookie = () => {
    Cookies.remove("auth_token", { path: "/" });
  };

  return { setAuthCookie, getAuthCookie, removeAuthCookie };
};
