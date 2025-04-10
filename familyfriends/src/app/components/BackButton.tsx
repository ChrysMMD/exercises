"use client";
import Link from "next/link";
import BackIcon from "./icons/BackIcon";

export default function BackButton() {
  return (
    <Link
      href="/"
      className="absolute top-4 left-4 p-2 rounded-full shadow-md hover:bg-white hover:stroke-black transition"
      aria-label="Gå tilbage"
    >
      <BackIcon />
    </Link>
  );
}
