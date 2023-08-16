import { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Briefing Room",
  description:
    "The Briefing Room is an open source tool, that lets you analyse telemetry data from F1 sessions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
