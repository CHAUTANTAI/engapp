"use client";

import { BreadCrumb, BreadCrumbProps } from "primereact/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useBreadcrumb } from "./breadscrum-context";
import { useRouteControl } from "../../../hook/routeControl";

interface BreadcrumbItem {
  label: string;
  icon?: string;
  command?: () => void;
  url?: string;
}

const LABEL_MAP: Record<string, string> = {
  dashboard: "Dashboard",
  deck: "Decks",
  flashcard: "Flashcards",
  new: "New",
  account: "Account",
  detail: "Detail",
};

function getLabel(part: string): string {
  return LABEL_MAP[part] || part;
}

export const Breadcrumbs = () => {
  const { breadcrumb, setBreadcrumb } = useBreadcrumb();
  const { redirectScreen } = useRouteControl();
  const pathname = usePathname();
  const [autoModel, setAutoModel] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    setBreadcrumb(null);

    const parts = pathname?.split("/").filter(Boolean);
    const model: BreadcrumbItem[] = [];

    if (parts) {
      parts.forEach((part, index) => {
        const path = "/" + parts.slice(0, index + 1).join("/");
        model.push({
          label: getLabel(part),
          command: () => redirectScreen(path),
        });
      });
    }

    setAutoModel(model);
  }, [pathname, redirectScreen, setBreadcrumb]);

  const model: BreadCrumbProps["model"] =
    breadcrumb && breadcrumb.length > 0
      ? breadcrumb.map((item) => ({
          label: item.label,
          icon: item.icon,
          command: () => redirectScreen(item.route),
        }))
      : autoModel;

  const home: BreadCrumbProps["home"] = {
    icon: "pi pi-home",
    command: () => redirectScreen("/"),
  };

  return <BreadCrumb model={model} home={home} />;
};
