"use client";

import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-4 border-t border-gray-700 max-h-[var(--footer-height)]">
      <div className="container mx-auto flex flex-col items-center gap-3">
        <Image
          src="/assets/img/logo.png"
          width={50}
          height={50}
          className="rounded-full shadow-lg"
          alt="ENG APP Logo"
        />
        <p className="text-sm">ENG APP V1.0.0 BY CTT</p>
      </div>
    </footer>
  );
};
