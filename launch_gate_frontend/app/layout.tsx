import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";
import { useCheckAuthQuery } from "@/services/queries/authQueries";
import LoadingScreen from "@/components/common/Loader";

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

  const checkAuthQuery = useCheckAuthQuery();

  if(checkAuthQuery.isPending) return LoadingScreen();

  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <TanstackQueryProvider>
          {children}
        </TanstackQueryProvider>
      </body>
    </html>
  );
}