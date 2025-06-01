import { ROUTER } from "../../../const/routers";
import { useRouteControl } from "../../../hook/routeControl";
import { PanelMenu } from "primereact/panelmenu";

export interface MenuItem {
  label: string;
  icon?: string;
  route?: ROUTER;
  items?: MenuItem[];
  command?: () => void;
}
export const SidebarMenu = ({ model }: { model: MenuItem[] }) => {
  const { redirectScreen } = useRouteControl();
  if (model.length === 0) return null;

  return (
    <aside
      className="w-64 min-w-56 max-w-xs "
      style={{
        position: "sticky",
        top: "80px",
        alignSelf: "flex-start",
        maxHeight: "calc(100vh - 80px)",
        minHeight: "calc(100vh - 80px)",
        overflowY: "auto",
        background: "#fff",
        borderRight: "1px solid #e5e7eb",
        zIndex: 20,
      }}
    >
      <PanelMenu
        model={model.map((item) => ({
          ...item,
          command: item.route ? () => redirectScreen(item.route!) : undefined,
        }))}
        className="h-full"
      />
    </aside>
  );
};
