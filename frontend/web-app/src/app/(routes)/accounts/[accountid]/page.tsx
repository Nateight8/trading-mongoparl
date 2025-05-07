"use client";
// import LogTrade from "./_components/log-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogForm } from "./_components/log-form";

import { useQuery } from "@apollo/client";
import tradeOperations from "@/graphql/operations/trade";
// import tradeOperations from "@/graphql/operations/trade";

interface PageProps {
  params: {
    accountid: string;
  };
}

export default function Page({ params }: PageProps) {
  const { accountid } = params;

  const { data, loading, error } = useQuery(
    tradeOperations.Querries.userTrades,
    {
      variables: { accountId: accountid },
    }
  );

  if (loading) return <div>Loading...</div>;

  console.log(data);

  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="w-full max-w-md mx-auto">
        <Card>
          <CardContent className="p-3">
            <LogForm accountId={accountid} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
