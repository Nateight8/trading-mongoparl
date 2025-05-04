import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table } from "lucide-react";
import { Grid } from "lucide-react";
import Account from "./account";

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
        <p className="text-muted-foreground p-4 text-center text-xs">
          Content for Tab 1
        </p>
      </TabsContent>
      <TabsContent value="grid">
        <div className="grid grid-cols-3 gap-4">
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
    Icon: <Table />,
  },
  {
    label: "Grid",
    value: "grid",
    Icon: <Grid />,
  },
];

// Example account stats
const accountStats = [
  {
    id: 1,
    balance: 10000,
    pnl: 1200,
    winrate: 62,
  },
  {
    id: 2,
    balance: 5000,
    pnl: 300,
    winrate: 55,
  },
  {
    id: 3,
    balance: 2000,
    pnl: 150,
    winrate: 48,
  },
  {
    id: 4,
    balance: 25000,
    pnl: 2500,
    winrate: 70,
  },
];
