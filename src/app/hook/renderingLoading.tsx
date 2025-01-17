"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface CommonHookProps {
  newRoute?: string;
}

export const useCommonHook = ({ newRoute }: CommonHookProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [loading, setLoading] = useState(false);

  const handleRouteChange = (path: string) => {
    setLoading(true);
    startTransition(() => {
      router.push(path);
    });
  };

  if (newRoute) {
    handleRouteChange(newRoute);
  }

  return {
    isPending,
    loading,
    handleRouteChange,
  };
};
