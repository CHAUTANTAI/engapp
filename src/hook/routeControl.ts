import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ROUTER } from "../const/routers";

export const useRouteControl = () => {
  const router = useRouter();

  const redirectScreen = useCallback(
    (path: ROUTER | string) => {
      router.push(path);
    },
    [router]
  );

  const back = useCallback(() => {
    router.back();
  }, [router]);

  return { redirectScreen, back };
};
