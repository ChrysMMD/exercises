import { Poppins } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "iWatch",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen">
        {/* Header, som vises på alle sider */}
        <div className="row-span-1 col-span-2">
          <Header />
        </div>
        {/* Plads til undersider */}
        {children}

      </body>
    </html>
  );
}
