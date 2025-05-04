import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "./account";
import AccountsTable from "@/app/(routes)/accounts/_components/accounts-table";
import { IconCategory2, IconChartArea, IconTable } from "@tabler/icons-react";
import Charts from "./charts";

export default function Component() {
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
        <AccountsTable data={accountStats} />
      </TabsContent>
      <TabsContent value="charts">
        <Charts />
      </TabsContent>
      <TabsContent value="grid">
        <div className="grid grid-cols-2 gap-4">
          {accountStats.map((accountStat) => (
            <Account key={accountStat.id} {...accountStat} />
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
    Icon: <IconTable />,
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

// Example account stats
const accountStats = [
  {
    id: 1,
    name: "FTMO Challenge",
    balance: 10000,
    pnl: 1200,
    winrate: 62,
  },
  {
    id: 2,
    name: "Funded Next",
    balance: 5000,
    pnl: 300,
    winrate: 55,
  },
  {
    id: 3,
    name: "Personal Account",
    balance: 2000,
    pnl: 150,
    winrate: 48,
  },
  {
    id: 4,
    name: "Alpha Capitals",
    balance: 25000,
    pnl: 2500,
    winrate: 70,
  },
];
