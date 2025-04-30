"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { useEffect } from "react";
import CartSyncWrapper from "@/components/CartSyncWrapper";
import { useCart } from "./store/cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <CartSyncWrapper>{children}</CartSyncWrapper>
      </body>
    </html>
  );
}
