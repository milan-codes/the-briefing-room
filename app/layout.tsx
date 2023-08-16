import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Briefing Room",
  description:
    "The Briefing Room is an open source tool, that lets you analyse telemetry data from F1 sessions",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
