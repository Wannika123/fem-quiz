import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { TuneProvider } from "@/context/TuneContext";

const rubik = localFont({
  src: "./fonts/Rubik-VariableFont.woff2",
  variable: "--font-rubik",
  weight: "100 900",
});
const rubikItalic = localFont({
  src: "./fonts/Rubik-Italic-VariableFont.woff2",
  variable: "--font-rubik-italic",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Frontend quiz",
  description: "challenge by frontend mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TuneProvider>
        <body className={`${rubik.variable} ${rubikItalic.variable}`}>
          <Header />
          {children}
        </body>
      </TuneProvider>
    </html>
  );
}
