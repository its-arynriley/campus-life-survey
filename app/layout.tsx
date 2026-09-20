import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "UVA Wise Campus Life Survey", description: "Feedback platform for UVA Wise students" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
