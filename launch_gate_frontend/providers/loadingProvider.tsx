"use client"

import LoadingScreen from "@/components/common/Loader";
import { useCheckAuthQuery } from "@/services/queries/authQueries";
import { ReactNode } from "react";


function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {

    const checkAuthQuery = useCheckAuthQuery();

    if(checkAuthQuery.isPending) return LoadingScreen();

  return (
    <div>
      {children}
    </div>
  )
}

export default LoadingProvider
