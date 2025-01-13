
import type { Metadata } from "next";
import "./globals.css";

import { Inter, Montserrat } from "next/font/google";
import { Outfit } from "next/font/google"; // Import Outfit font
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "sonner";
import SquareScript from "@/components/SquareScript";


export const metadata: Metadata = {
  title: "Jodeyinka",
  description:
    "Jodeyinka",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
  variable: "--font-montserrat",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-outfit",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${outfit.variable} ${inter.variable}`}
      >
      
        <div>
        <ReduxProvider>{children}</ReduxProvider>
        

        <Toaster />

        </div>
        
      <script src="https://js.squareup.com/v2/paymentform"></script>
      </body>
    </html>
  );
}
