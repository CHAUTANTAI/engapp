// src/app/layout.tsx
"use client";
import "../styles/custom-css/index.scss";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/header/header";
import { Footer } from "../components/layout/footer/footer";
import { usePathname, redirect } from "next/navigation";
import { useMasterDataStore } from "../store/master-data";

// Import metadata từ một file khác
import { metadata } from "./metadata"; // Thêm dòng này để import metadata
import { ROUTER } from "../const/routers";

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
  const { session } = useMasterDataStore();
  const pathName = usePathname();
  if (session === false) {
    if (!pathName?.includes(ROUTER.AUTH)) {
      redirect(ROUTER.LOGIN);
    }
  }
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
            {children}
            <Footer />
          </>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}
