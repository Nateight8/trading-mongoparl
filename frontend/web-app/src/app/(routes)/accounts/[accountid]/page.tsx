"use client";
// import LogTrade from "./_components/log-dialog";
import AccountTable from "./_components/account-table";
import { useQuery } from "@apollo/client";
import tradeOperations, { TradeProps } from "@/graphql/operations/trade";
import { mockTradeLogData } from "./_components/account-table";
import UpdateLog from "./_components/update-log";
import { Card, CardContent } from "@/components/ui/card";
import { LogForm } from "./_components/log-form";
import UpdateLogStatus from "./_components/update-log-status";
import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import type { TradeLogItem } from "./_components/account-table";

interface PageProps {
  params: Promise<{
    accountid: string;
  }>;
}

export default function Page({ params }: PageProps) {
  const { accountid } = use(params);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState<TradeProps | undefined>(undefined);

  const handleOpen = (trade: TradeLogItem) => {
    setSelectedTrade(trade as TradeProps);
    setIsOpen(true);
  };

  const { data, loading } = useQuery(tradeOperations.Querries.loggedTrades, {
    variables: { accountId: accountid },
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="h-screen w-full flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardContent className="p-3">
              <LogForm accountId={accountid} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="min-h-[100vh] flex-1 md:min-h-min">
        <AccountTable 
          handleOpen={handleOpen} 
          data={data?.loggedTrades ?? []} 
        />

        {selectedTrade && (
          <UpdateLogStatus
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            trade={selectedTrade}
          />
        )}
      </div>
    </>
  );
}

// Mocked data for AccountTable
const mockedData = mockTradeLogData;
