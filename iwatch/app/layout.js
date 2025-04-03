import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Tilføj de vægte, du vil bruge
  variable: "--font-poppins",
});

export const metadata = {
  title: "iWatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body
        className="min-h-screen"
      >
        {children}
      </body>
    </html>
  );
}
