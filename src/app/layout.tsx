"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Courses: encodedCoder · Suresh</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="p-4 bg-gray-800 text-white text-center">
          <h1 className="text-2xl font-bold">Courses: encodedCoder · Suresh</h1>
        </header>
        <main className="p-4">{children}</main>
        <footer className="p-4 bg-gray-800 text-white text-center">
          <p>
            Copyright &copy; {year} encodedCoder · Suresh. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
