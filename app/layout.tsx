import { ReactNode } from "react";
import "./globals.css";
import { Providers } from './utils/provider';
import type { Metadata } from "next";

// Define proper types for layout props
interface RootLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Books4All - Discover Books That Shape Your World",
  description: "Buy and sell textbooks, fiction, and more. Connect with fellow readers and get personalized recommendations.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

// You can uncomment these font imports if you need them
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });




