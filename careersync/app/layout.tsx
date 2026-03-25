import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "../app/styles/global.css"
import "../app/styles/theme.css"
import "../app/styles/fonts.css"
import { Analytics } from "@vercel/analytics/next"
const spaceGrotesk = Space_Grotesk({
  variable: "--space-grotesk",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { template: 'CareerSync - %s', default: 'CareerSync' },
  description: "v1.0.5",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}