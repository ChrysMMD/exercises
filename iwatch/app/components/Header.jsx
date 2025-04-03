"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBasketShopping,
} from "@fortawesome/free-solid-svg-icons";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="col-span-2 flex justify-between items-center">
      <div>
        <Image
          src="/Logo.png"
          alt="iWatch Logo"
          width={50}
          height={50}
          priority
        />
      </div>

      <nav className="hidden md:flex space-x-6 text-white">
        <NavLink href="/">Mac</NavLink>
        <NavLink href="/features">iPhone</NavLink>
        <NavLink href="/features">iPad</NavLink>
        <NavLink href="/pricing">iWatch</NavLink>
        <NavLink href="/gallery">Support</NavLink>
      </nav>

      <div className="flex items-center space-x-4">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-white" />
        <div className="w-px h-6 bg-white"></div>
        <FontAwesomeIcon icon={faBasketShopping} className="text-white" />
      </div>
    </header>
  );
}
