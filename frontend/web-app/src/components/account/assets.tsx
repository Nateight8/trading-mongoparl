import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./account";
import AccountsTable from "@/app/(routes)/accounts/_components/accounts-table";
import {
  IconCategory2,
  IconChartArea,
  IconList,
  IconPlus,
} from "@tabler/icons-react";
import Charts from "./charts";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { TradingAccounts } from "@/graphql/operations/account";
// export interface Account {
//   id: string;
//   name: string;
//   currentBalance: number;
//   roi?: number;
//   winrate?: number;
//   pnl?: number;

//   chartData?: {
//     month: string;
//     actual: number;
//     projected: number;
//   }[];
// }

export default function Assets({
  accounts,
}: {
  accounts: TradingAccounts | undefined;
}) {
  const router = useRouter();

  const tradingAccounts = accounts?.getUserTradingAccounts;

  return (
    <Tabs
      defaultValue="table"
      className="w-full p-4 border-2 border-black rounded-lg"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-lg font-bold">Assets</h1>
        <div className="space-x-2">
          <Button
            onClick={() => router.push("/accounts/new")}
            className="h-7 shadow-sm shadow-black "
            variant="outline"
            size="sm"
          >
            <IconPlus />
          </Button>
          <TabsList className="bg-transparent">
            {tabs.map((view) => (
              <TabsTrigger
                key={view.value}
                value={view.value}
                className="data-[state=active]:bg-muted text-muted-foreground data-[state=active]:border-border shadow-black data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                {view.Icon}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
      </div>
      <TabsContent value="table">
        <AccountsTable data={tradingAccounts} />
      </TabsContent>
      <TabsContent value="charts">
        {/* <Charts accounts={tradingAccounts} /> */}
      </TabsContent>
      <TabsContent value="grid">
        <div className="grid grid-cols-2 gap-4">
          {tradingAccounts?.map((account) => (
            <Account key={account.accountName} account={account} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

const tabs = [
  {
    label: "Table",
    value: "table",
    Icon: <IconList />,
  },
  {
    label: "Charts",
    value: "charts",
    Icon: <IconChartArea />,
  },
  {
    label: "Grid",
    value: "grid",
    Icon: <IconCategory2 />,
  },
];
