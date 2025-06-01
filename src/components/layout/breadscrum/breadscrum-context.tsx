// app/context/breadcrumb-context.tsx
"use client";
import { createContext, useContext, useState } from "react";

export interface BreadCrumbItem {
  label: string;
  route: string;
  icon?: string;
}

interface BreadcrumbContextType {
  breadcrumb: BreadCrumbItem[] | null;
  setBreadcrumb: (items: BreadCrumbItem[] | null) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType>({
  breadcrumb: null,
  setBreadcrumb: () => {},
});

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [breadcrumb, setBreadcrumb] = useState<BreadCrumbItem[] | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
