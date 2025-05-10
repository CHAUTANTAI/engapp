// src/app/layout.tsx
"use client";
import "../styles/custom-css/index.scss";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header/header";
import { Footer } from "../components/layout/footer/footer";
import { usePathname, redirect } from "next/navigation";
import { useMasterDataStore } from "../store/master-data-store";

import { metadata } from "./metadata";
import { ROUTER } from "../const/routers";
import { LoadingDialog } from "../components/common/loading/loadingDialog";
import { useCommonStore } from "../store/common-store";
import { useAuthCookies } from "../hook/cookies";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth-store";
import { PrimeReactProvider } from "primereact/api";
import { PanelMenu } from "primereact/panelmenu";
import { useRouteControl } from "../hook/routeControl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export interface MenuItem {
  label: string;
  icon?: string;
  route?: ROUTER;
  items?: MenuItem[];
  command?: () => void;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, getSession } = useMasterDataStore();
  const { isLoading } = useCommonStore();
  const { getAuthCookie, getAccountIdCookie } = useAuthCookies();
  const pathName = usePathname();
  const token = getAuthCookie()?.toString() || undefined;
  const account_id = getAccountIdCookie() || undefined;
  const {} = useAuthStore();
  const [sidebarModel, setSidebarModel] = useState<MenuItem[]>([]);
  const { redirectScreen } = useRouteControl();

  const homeSidebarModel: MenuItem[] = [];
  const dashboardSidebarModel: MenuItem[] = [
    { label: "Flashcards", icon: "pi pi-clone", route: ROUTER.FLASHCARD },
    { label: "More", icon: "pi pi-ellipsis-h" },
  ];
  const accountSidebarModel: MenuItem[] = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
  ];

  useEffect(() => {
    if (pathName?.startsWith(ROUTER.DASHBOARD)) {
      setSidebarModel(dashboardSidebarModel);
    } else if (pathName?.startsWith(ROUTER.ACCOUNT)) {
      setSidebarModel(accountSidebarModel);
    } else if (pathName === ROUTER.HOME) {
      setSidebarModel(homeSidebarModel);
    } else {
      setSidebarModel([]);
    }
  }, [pathName]);
  useEffect(() => {
    if (token && token === "OOO") {
      if (session === false) {
        getSession();
      }
      useAuthStore.setState({
        accountData: {
          account_id: Number(account_id),
          email: "",
          rule_id: 2,
        },
      });
    } else if (!pathName?.includes(ROUTER.AUTH)) {
      redirect(ROUTER.LOGIN);
    }
  }, [token, pathName, getSession, session]);

  console.log(sidebarModel);
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col text-black`}
      >
        {pathName !== ROUTER.LOGIN && pathName !== ROUTER.REGISTER ? (
          <>
            <PrimeReactProvider value={{ ripple: true }}>
              <div className="sticky top-0 z-50 w-full">
                <Header />
              </div>
              {/* Flex container: Sidebar + Main content */}
              <div
                className="flex flex-1 min-h-0 bg-white"
                style={{ minHeight: "0" }}
              >
                {sidebarModel.length > 0 && (
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
                      model={sidebarModel.map((item) => ({
                        ...item,
                        command: item.route
                          ? () => redirectScreen(ROUTER.FLASHCARD)
                          : undefined,
                      }))}
                      className="h-full "
                    />
                  </aside>
                )}
                <main className="flex-1 overflow-y-auto p-1">{children}</main>
              </div>
              <Footer />
            </PrimeReactProvider>
          </>
        ) : (
          <>{children}</>
        )}
        {isLoading === true ? <LoadingDialog /> : null}
      </body>
    </html>
  );
}
