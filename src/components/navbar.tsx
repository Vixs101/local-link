"use client";

import { useEffect, useState } from "react";
import Link from 'next/link'
import WalletButton from './WalletButtons'
import { usePathname } from "next/navigation";

const NavbarLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Campaigns",
    href: "/campaigns",
  },
  {
    name: "How it works",
    href: "/how-it-works",
  },
  {
    name: "About",
    href: "/about",
  },
];

const NavBar = () => {
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
    <nav className={`container flex items-center justify-between rounded-2xl py-3 px-4 z-10 sticky top-4 transition-all duration-300 ${
        isScrolled ? "bg-black text-white shadow-md w-full z-20" : "bg-transparent"
      }`}>
      <div className="ps-3 flex items-center gap-x-10">
        <Link href={"/"} className="font-bold">APP</Link>
        
        <div className="space-x-4 hidden sm:block">
          {NavbarLinks.map((link, index) => (
            <Link key={index} href={`${link.href}`} className={`hover:text-lime-400 transition-colors tracking-wide duration-300 ${location === link.href && "text-lime-400"}`}>
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

export default NavBar