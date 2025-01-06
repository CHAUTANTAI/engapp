// app/components/Header.tsx

"use client";
import Link from "next/link";

interface LogoProps {
  color?: string;
}

export const Logo = ({ color = "black" }: LogoProps) => {
  return (
    <div
      className={`font-poppins text-[24px] font-bold`}
      style={{ color: color }}
    >
      CTT
    </div>
  );
};

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-gray-400">
            ENG APP
          </Link>
        </div>
        <div className="space-x-6">
          <Link href="/vocab" className="hover:text-gray-400">
            Vocab
          </Link>
          <Link href="/practise" className="hover:text-gray-400">
            Practise
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
