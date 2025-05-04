"use client";

// import { useQuery } from "@apollo/client";
// import userOperations from "@/graphql/operations/user-operations";

export default function Home() {
  // const { data, loading } = useQuery(userOperations.Querries.getLoggedInUser);

  // if (!data?.getLoggedInUser.user) {
  //   return <div>Not logged in</div>;
  // }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div>hello</div>
    </div>
  );
}
