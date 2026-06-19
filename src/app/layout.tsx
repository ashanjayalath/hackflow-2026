import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"; // 👈 අලුතින් හදපු providers එක import කරගන්න

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HackFlow 2026",
  description: "Canva & Google Flow Poster Competition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning එක දාන්න Chakra UI v3 වල hydration errors මඟහරවා ගන්න
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          {children} {/* 👈 දැන් හැම page එකක්ම ChakraProvider එක ඇතුළේ ආරක්ෂිතව render වෙනවා */}
        </Providers>
      </body>
    </html>
  );
}