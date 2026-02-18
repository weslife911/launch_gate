"use client"
import Navbar from "@/components/common/Navbar";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

function VisibleDashbardProvider({ children }: {
    children: ReactNode
}) {

    const pathname = usePathname();

    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <>
            {!isDashboard && <Navbar />}
            {children}
        </>
    )
}

export default VisibleDashbardProvider
