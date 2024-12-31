"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'
import WalletButton from '../WalletButtons'
import { usePathname } from "next/navigation";

const NavbarLinks = [
  {
    name: "Products",
    href: "/",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Support",
    href: "/support",
  },
  {
    name: "History",
    href: "/history",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function DesktopNav() {
  const location = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  // Add a scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Set state when scrolled past 50px
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`container flex items-center justify-between rounded-2xl py-3 px-4 z-10 sticky top-4 transition-all duration-300 ${isScrolled ? "bg-black text-white shadow-md w-full z-20" : "bg-transparent"
      }`}>
      <div className="ps-3 flex items-center gap-x-10">
        <Link href="/" className="flex items-center space-x-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#007BFF]">
              <span className="text-xl font-bold text-white">Y</span>
            </div>
            <span className="text-xl font-semibold">YardSale</span>
          </div>
        </Link>

        <div className="space-x-4 hidden sm:block">
          {NavbarLinks.map((link, index) => (
            <Link key={index} href={`${link.href}`} className={`hover:text-[#007BFF] transition-colors tracking-wide duration-300 ${location === link.href && "text-[#007BFF]"}`}>
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <WalletButton />
    </nav>
  )
}
