import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./account";
import AccountsTable from "@/app/(routes)/accounts/_components/accounts-table";
import { IconCategory2, IconChartArea, IconList } from "@tabler/icons-react";
import Charts from "./charts";

export interface Account {
  id: string;
  name: string;
  currentBalance: number;
  roi?: number;
  winrate?: number;
  pnl?: number;

  chartData?: {
    month: string;
    actual: number;
    projected: number;
  }[];
}

export default function Assets({ accounts }: { accounts: Account[] }) {
  return (
    <Tabs
      defaultValue="table"
      className="w-full p-4 border-2 border-black rounded-lg"
    >
      <div className="flex justify-between items-center ">
        <h1 className="text-lg font-bold">Assets</h1>
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
      <TabsContent value="table">
        <AccountsTable data={accounts} />
      </TabsContent>
      <TabsContent value="charts">
        <Charts accounts={accounts} />
      </TabsContent>
      <TabsContent value="grid">
        <div className="grid grid-cols-2 gap-4">
          {accounts.map((account) => (
            <Account key={account.name} account={account} />
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
