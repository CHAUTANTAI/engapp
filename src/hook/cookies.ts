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

  const getAccountIdCookie = () => {
    return Cookies.get("account_id") || null;
  };

  const setAccountIdCookie = (account_id: number) => {
    Cookies.set("account_id", account_id.toString(), { expires: 7, path: "/" });
  };

  const removeAuthCookie = () => {
    Cookies.remove("auth_token", { path: "/" });
  };

  return { setAuthCookie, getAuthCookie, removeAuthCookie, getAccountIdCookie, setAccountIdCookie };
};
