"use client";

// import { useQuery } from "@apollo/client";
// import userOperations from "@/graphql/operations/user-operations";
// import AddAccount from "@/components/account/add";
import Onboard from "@/components/onboard/onboard";

export default function Home() {
  // const { data, loading, error } = useQuery(
  //   userOperations.Querries.getLoggedInUser
  // );

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // }

  // if (!data?.getLoggedInUser.user) {
  //   return <div>Not logged in</div>;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="">
      <Onboard />
    </div>
  );
}
