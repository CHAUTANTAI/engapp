// src/app/layout.tsx
"use client";
import "@/styles/custom-css/index.scss";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer/footer";
import { usePathname } from "next/navigation";

import { metadata } from "./metadata";
import { ROUTER } from "@/const/routers";
import { useEffect, useState } from "react";
import { PrimeReactProvider } from "primereact/api";
import { SidebarMenu } from "@/components/layout/sidebar-menu/sidebar-menu";

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
  const pathName = usePathname();

  const [sidebarModel, setSidebarModel] = useState<MenuItem[]>([]);

  const homeSidebarModel: MenuItem[] = [];
  const dashboardSidebarModel: MenuItem[] = [
    { label: "Dashboard", icon: "pi pi-credit-card", route: ROUTER.DASHBOARD },
    { label: "Decks", icon: "pi pi-server", route: ROUTER.DECK },
    { label: "Flashcards", icon: "pi pi-clone", route: ROUTER.FLASHCARD },
    { label: "More", icon: "pi pi-ellipsis-h" },
  ];
  const accountSidebarModel: MenuItem[] = [
    { label: "Profile", icon: "pi pi-user" },
    { label: "Settings", icon: "pi pi-cog" },
  ];

  /** Model Sidebar */
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

  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col text-black overflow-x-hidden`}
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
                  <SidebarMenu model={sidebarModel} />
                )}
                <main className="flex-1 overflow-y-auto p-1">{children}</main>
              </div>
              <Footer />
            </PrimeReactProvider>
          </>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
