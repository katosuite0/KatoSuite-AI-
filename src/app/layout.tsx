import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ResponseLogger } from "@/components/response-logger";
import FarcasterWrapper from "@/components/FarcasterWrapper";
import { PrivyWrapper } from "@/lib/privy/provider";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ErrorBoundary>
          <PrivyWrapper>
            <FarcasterWrapper>{children}</FarcasterWrapper>
          </PrivyWrapper>
        </ErrorBoundary>
        <ResponseLogger />
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "KatoSuite ECE Solutions",
  description:
    "KatoSuite offers AI-powered tools for early childhood educators. With an 8-tier pricing plan, it features lesson planning, compliance tracking, and parent communication for seamless ECE management.",
};
