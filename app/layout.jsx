import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/context/Providers"; 


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kumhar - Artisan Furniture Marketplace",
  description: "Discover beautifully crafted furniture from skilled artisans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}