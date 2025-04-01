import "./globals.css";
import React from "react";
import CookieConcent from "./cookie-concent/CookieConcent";

//children er en prop som jeg bruger til at vise indholdet. React.ReactNoce er en type, som dækker over alt, der kan renderes i React.
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1>My Website</h1>
        </header>
        <main>{children}</main>
        <CookieConcent />
        <footer>
          <p>© 2025 My Website</p>
        </footer>
      </body>
    </html>
  );
}
