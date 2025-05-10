"use client";

import { useState } from "react";
import { CustomText } from "../../components/common/text/text";
import { HEADER_ITEM_DASHBOARD } from "../../const/label";
import { ROUTER } from "../../const/routers";
import { useRouteControl } from "../../hook/routeControl";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [activeItem, setActiceItem] = useState<HEADER_ITEM_DASHBOARD>(
    HEADER_ITEM_DASHBOARD.VOCAB
  );
  const { redirectScreen } = useRouteControl();
  const headerItems = [
    { label: HEADER_ITEM_DASHBOARD.VOCAB, route: ROUTER.VOCAB },
    { label: HEADER_ITEM_DASHBOARD.PRACTICE, route: ROUTER.PRACTICE },
  ];

  const handleOnClickItem = (item: {
    label: HEADER_ITEM_DASHBOARD;
    route: ROUTER;
  }) => {
    if (item.label !== activeItem) {
      setActiceItem(item.label);
      redirectScreen(item.route);
    }
  };
  return (
    <div className="flex flex-col pb-2 gap-y-2 ssm-under:px-[var(--padding-center-mobile)]">
      <CustomText
        text="WELCOME TO DASHBOARD"
        size={28}
        weight="bold"
        color="primary"
      />
      <div className="flex flex-wrap items-center border-t-2 border-gray-100 border-b-2 px-4 py-2 gap-y-4">
        {headerItems.map((item, index) => {
          return (
            <div
              key={index}
              className={`flex flex-row items-center justify-center bg-[var(--color-primary-light)] rounded-sm scale-animation-active text-white
                ${
                  activeItem === item.label
                    ? "w-[175px] h-[50px] bg-[var(--color-primary)] "
                    : "w-[155px] h-[40px]"
                }`}
              style={{
                clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)",
              }}
              onClick={() => handleOnClickItem(item)}
            >
              <div
                className={`font-bold mx-4 ${
                  activeItem === item.label ? "text-[1.2rem]" : "text-[1rem]"
                }`}
              >
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
      {children}
    </div>
  );
};
export default DashboardLayout;
