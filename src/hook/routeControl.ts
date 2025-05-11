"use client";
import { useRouter } from "next/navigation";
import { ROUTER } from "../const/routers";

export const useRouteControl = () => {
  const router = useRouter();

  const redirectScreen = (newUrl: ROUTER | string) => {
    console.log("Redirecting to:", newUrl);
    router.push(newUrl);
  };

  return { redirectScreen };
};
