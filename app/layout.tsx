import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"]});
const oswald = Oswald({ subsets: ["latin"], weight:['200','300','500','700'] });

export const metadata: Metadata = {
  title: "OtakuShop - le site de référence des articles de fan de MANGAS",
  description: "Otaku shop vous offre la possibilité d'entrer en possession de nombreux articles de la culture japonaise",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}>{children}</body> */}
      <body className={inter.className}>
        <div className={oswald.className}>
          {children}
        </div>
        <Footer/>
      </body>
    </html>
  );
}
