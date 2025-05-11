"use client";
import { BreadCrumb } from "primereact/breadcrumb";
import { usePathname } from "next/navigation";
import { ROUTER } from "../../const/routers";
import { useRouteControl } from "../../hook/routeControl";
import { useEffect, useState } from "react";
import { useParams } from "next/dist/client/components/navigation";

export interface BreadCrumbItem {
  label: string;
  icon?: string;
  route: ROUTER | string;
  command?: () => void;
}

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const pathName = usePathname();
  const params = useParams();
  const { redirectScreen } = useRouteControl();
  const [breadcrumbModel, setBreadcrumbModel] = useState<BreadCrumbItem[]>([]);
  const home = { icon: "pi pi-home", url: ROUTER.HOME };

  useEffect(() => {
    if (pathName === ROUTER.DASHBOARD) {
      setBreadcrumbModel([{ label: "Dashboard", route: ROUTER.DASHBOARD }]);
    } else if (pathName?.startsWith(ROUTER.FLASHCARD)) {
      const parts = pathName.split("/");
      // parts: ["", "dashboard", "flashcard", "1", "new"]
      const id = parts.length > 3 ? parts[3] : undefined;
      const isNew = parts.length > 4 && parts[4] === "new";

      const flashcardName = id ? `Flashcard ${id}` : "";
      const model: BreadCrumbItem[] = [
        { label: "Dashboard", route: ROUTER.DASHBOARD },
        { label: "Flashcards", route: ROUTER.FLASHCARD },
      ];
      if (id) {
        model.push({
          label: flashcardName,
          route: ROUTER.FLASHCARD_DETAIL + id,
        });
      }
      if (isNew) {
        model.push({
          label: "New Card",
          route: ROUTER.FLASHCARD_DETAIL + id + "/new",
        });
      }
      setBreadcrumbModel(model);
    }
  }, [pathName, params]);

  return (
    <div className="flex flex-col pb-2 gap-y-2 ssm-under:px-[var(--padding-center-mobile)]">
      <BreadCrumb
        model={breadcrumbModel.map((item) => ({
          ...item,
          command: item.route ? () => redirectScreen(item.route) : undefined,
        }))}
        home={home}
      />
      {children}
    </div>
  );
};
export default DashboardLayout;
