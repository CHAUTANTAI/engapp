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
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, getSession } = useMasterDataStore();
  const { isLoading } = useCommonStore();
  const { getAuthCookie } = useAuthCookies();
  const pathName = usePathname();
  const token = getAuthCookie()?.toString() || undefined;

  useEffect(() => {
    console.log("useEffect");

    if (token && token === "OOO") {
      if (session === false) {
        getSession();
      }
    } else if (!pathName?.includes(ROUTER.AUTH)) {
      console.log("pathName:", pathName);
      redirect(ROUTER.LOGIN);
    }
  }, [token, pathName, getSession, session]);

  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {pathName !== ROUTER.LOGIN && pathName !== ROUTER.REGISTER ? (
          <>
            <Header />
            <div className="bg-white w-full min-h-[calc(100vh-197px)] ssm-under:min-h-[calc(100vh-173px)]">
              {children}
            </div>
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
        {isLoading === true ? <LoadingDialog /> : null}
      </body>
    </html>
  );
}
