"use client";

// import { useQuery } from "@apollo/client";
// import userOperations from "@/graphql/operations/user-operations";
// import AddAccount from "@/components/account/add";
import Onboard from "@/components/onboard/onboard";
import userOperations from "@/graphql/operations/user-operations";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

import Accounts from "@/components/account/accounts";
export default function Home() {
  const { data, loading } = useQuery(userOperations.Querries.getLoggedInUser, {
    fetchPolicy: "network-only",
  });

  const router = useRouter();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data?.getLoggedInUser.user) {
    return router.push("/login");
  }

  if (!data.getLoggedInUser.user.onboardingCompleted) {
    return <Onboard />;
  }

  return <Accounts />;
}
