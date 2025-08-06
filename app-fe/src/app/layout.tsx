import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactFlowProvider } from "@xyflow/react";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";

const font = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"], // choose weights you need
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cooksy - What To Make?",
  description: "",
  icons: ["/logo-bg.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <TRPCReactProvider>
        <ReactFlowProvider>
          <html lang="en">
            <body className={font.className}>
              <Toaster />
              {children}
            </body>
          </html>
        </ReactFlowProvider>
      </TRPCReactProvider>
    </ClerkProvider>
  );
}
