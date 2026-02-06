"use client"

import LoadingScreen from "@/components/common/Loader";
import { useLogoutMutation } from "@/services/mutations/authMutations";
import { useCheckAuthQuery } from "@/services/queries/authQueries";
import { ReactNode } from "react";


function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {

    const checkAuthQuery = useCheckAuthQuery();
    const logoutMutation = useLogoutMutation();

    if(checkAuthQuery.isPending || logoutMutation.isPending) return LoadingScreen();

  return (
    <div>
      {children}
    </div>
  )
}

export default LoadingProvider
