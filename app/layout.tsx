import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BharatPDF AI",
  description: "Task-first PDF workflows for Indian mobile-web users.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
