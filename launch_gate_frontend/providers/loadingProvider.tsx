"use client"

import LoadingScreen from "@/components/common/Loader";
import { useLoginMutation, useLogoutMutation, useSignupMutation, useUpdateProfileMutation } from "@/services/mutations/authMutations";
import { useCheckAuthQuery } from "@/services/queries/authQueries";
import { useReferralDataQuery } from "@/services/queries/referralQueries";
import { ReactNode } from "react";

function LoadingProvider({
  children,
}: {
  children: ReactNode;
}) {
  const checkAuthQuery = useCheckAuthQuery();
  const referralQuery = useReferralDataQuery();
  const logoutMutation = useLogoutMutation();
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const updateProfileMutation = useUpdateProfileMutation();

  const isGlobalPending =
    checkAuthQuery.isPending ||
    referralQuery.isPending ||
    loginMutation.isPending ||
    signupMutation.isPending ||
    logoutMutation.isPending ||
    updateProfileMutation.isPending;

  if (isGlobalPending) return <LoadingScreen />;

  return (
    <div>
      {children}
    </div>
  )
}

export default LoadingProvider;