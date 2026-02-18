import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";
import LoadingProvider from "@/providers/loadingProvider";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "sonner";
import VisibleDashbardProvider from "@/providers/visibleDashbardProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LaunchGate | Scaling Launchpad",
  description: "Automated recruitment and scaling infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {



  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <TanstackQueryProvider>
          <LoadingProvider>
            <VisibleDashbardProvider>
              <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
                {children}
              </main>
            </VisibleDashbardProvider>
          </LoadingProvider>
        </TanstackQueryProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}