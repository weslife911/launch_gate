"use client"

import LoadingScreen from "@/components/common/Loader";
import { useLoginMutation, useLogoutMutation, useSignupMutation } from "@/services/mutations/authMutations";
import { useCheckAuthQuery } from "@/services/queries/authQueries";
import { ReactNode } from "react";


function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {

    const checkAuthQuery = useCheckAuthQuery();
    const logoutMutation = useLogoutMutation();
    const loginMutation = useLoginMutation();
    const singupMutation = useSignupMutation();

    if(checkAuthQuery.isPending || loginMutation.isPending || singupMutation.isPending || logoutMutation.isPending) return LoadingScreen();

  return (
    <div>
      {children}
    </div>
  )
}

export default LoadingProvider
