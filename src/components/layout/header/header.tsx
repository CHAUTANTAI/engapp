import { useState, useEffect, useMemo } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";
import { HEADER_ITEM } from "../../../const/label";

interface HeaderItem {
  label: string;
  route: ROUTER;
}

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const { redirectScreen } = useRouteControl();

  const items: HeaderItem[] = [
    { label: HEADER_ITEM.HOME, route: ROUTER.HOME },
    { label: HEADER_ITEM.DASHBOARD, route: ROUTER.VOCAB },
    { label: HEADER_ITEM.ACCOUNT, route: ROUTER.ACCOUNT },
  ];

  const handleItemClick = (item: HeaderItem, closeSidebar: boolean = false) => {
    if (activeItem !== item.label) {
      setActiveItem(item.label);
      redirectScreen(item.route);
    }
    if (closeSidebar) setVisible(false);
  };

  // Memoize model to avoid recalculating every render
  const menuModel = useMemo(
    () =>
      items.map((item) => ({
        label: item.label,
        command: () => handleItemClick(item, true),
      })),
    [items, activeItem]
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {isMobile ? (
        <div className="flex items-center p-2 bg-[var(--primary-color)] text-white gap-x-2">
          <Button icon="pi pi-bars" onClick={() => setVisible(true)} />
          <span className="text-white font-bold text-[1rem]">ENG APP</span>
        </div>
      ) : (
        <div className="h-20 flex justify-between items-center bg-[var(--primary-color)] py-3 px-6 w-full relative">
          {/* Start - Logo */}
          <div className="text-white text-[2rem] font-bold z-10">ENG APP</div>

          {/* Center - Menu items */}
          <div className="rounded-full shadow-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-x-6 z-0">
            {items.map((item) => (
              <Button
                key={item.label}
                label={item.label}
                rounded
                onClick={() => handleItemClick(item)}
                className="w-[8rem]"
              />
            ))}
          </div>

          {/* End - User icon */}
          <Button icon="pi pi-user" aria-label="User" />
        </div>
      )}

      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="bg-white w-2/3"
        showCloseIcon={false}
      >
        <div className="text-[var(--primary-color)] text-[2rem] font-bold text-center mb-3">
          ENG APP
        </div>
        <Menu model={menuModel} className="w-full" />
      </Sidebar>
    </div>
  );
}
