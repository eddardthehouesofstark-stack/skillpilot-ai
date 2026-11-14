import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SkillPilot AI — Your next skill starts here",
  description: "An intelligent learning and career development platform.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
