import { useState, useEffect } from "react";
import { Menubar } from "primereact/menubar";
import { Sidebar } from "primereact/sidebar";
import { Button } from "../../common/button/button";
import { Icon } from "../../common/icon/icon";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";

export default function ResponsiveHeader() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("Home");
  const { redirectScreen } = useRouteControl();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { label: "Home", route: ROUTER.HOME },
    { label: "Dashboard", route: ROUTER.VOCAB },
    { label: "Account", route: ROUTER.ACCOUNT },
  ];

  const handleOnClickItem = (
    route: ROUTER,
    label: string,
    additionalAction?: () => void
  ) => {
    if (activeItem !== label) {
      setActiveItem(label || "Home");
      redirectScreen(route);
      if (additionalAction) {
        additionalAction();
      }
    }
  };

  return (
    <div className="relative">
      {isMobile ? (
        <div className="flex items-center p-3 bg-[var(--primary)] text-white gap-x-2">
          <Icon
            name="bars"
            onClickWrapper={() => {
              setVisible(true);
            }}
          />
          <Button
            type="button"
            onClick={() => {
              setVisible(true);
            }}
            className="mr-2 text-white font-bold text-[1rem] "
            value={"ENG APP"}
          />
        </div>
      ) : (
        <Menubar
          start={() => (
            <div className="text-white text-[2rem] font-bold absolute top-4 left-5">
              ENG APP
            </div>
          )}
          model={items.map((item) => {
            return {
              ...item,
              className: `text-white font-bold text-[1rem] px-8 py-4 rounded-full scale-animation-active ${
                activeItem === item.label ? "button-primary-active" : ""
              }`,
              command: () => {
                handleOnClickItem(item.route, item.label);
              },
            };
          })}
          className="py-3 flex items-center justify-center bg-[var(--primary)] w-full"
        />
      )}

      {/* Sidebar cho mobile */}
      <Sidebar
        visible={visible}
        onHide={() => {
          setVisible(false);
        }}
        className="bg-white rounded-tr-3xl rounded-br-3xl"
        header={() => (
          <div className="text-[rgba(30,108,153,1)] text-[2rem] font-bold flex items-center justify-center bg-[#1e6c994b] w-full border-b-2 border-blue-100 rounded-tr-3xl">
            ENG APP
          </div>
        )}
        showCloseIcon={false}
      >
        <ul className="list-none py-4">
          {items.map((item, index) => (
            <div key={index}>
              <li
                className={`pr-4 py-3 flex items-center font-bold text-[rgba(30,108,153,1)] scale-animation-active
                        ${
                          activeItem === item.label
                            ? "justify-center text-[1.5rem] pr-24 text-[rgb(30,140,170)]"
                            : "pl-8 text-[1rem]"
                        }`}
                onClick={() => {
                  handleOnClickItem(item.route, item.label, () => setVisible(false));
                }}
              >
                {item.label}
              </li>
              <div className="border-b-2 border-gray-100 w-full"></div>
            </div>
          ))}
        </ul>
      </Sidebar>
    </div>
  );
}
