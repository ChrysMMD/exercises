"use client";

import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`relative px-4 py-2 rounded-full transition-colors duration-300 
      hover:bg-white hover:text-[var(--color-primary)]
      ${isActive ? "bg-white text-[var(--color-primary)]" : ""}`}
    >
      {children}
    </a>
  );
}
