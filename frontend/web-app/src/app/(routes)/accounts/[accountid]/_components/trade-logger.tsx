import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogForm } from "./log-form";
import Executed from "./update-v2";
import CloseTrade from "./close-trade";
import { TradeProps } from "@/graphql/operations/trade";

export default function TradeLogger({
  trade,
  id,
}: {
  trade: TradeProps;
  id: string;
}) {
  // const form = useForm<z.infer<typeof executeTradeSchema>>({

  console.log("SELECTED TRADE", trade);

  return (
    <Card className="w-full max-w-sm mx-auto">
      <Tabs defaultValue="log" className="items-center">
        {/* <TabsContent value="log" className="w-full p-2">
          <h2 className="text-lg  text-center font-semibold">Log Trade</h2>
        </TabsContent> */}
        {/* <TabsContent value="edit" className="w-full p-2"></TabsContent>
        <TabsContent value="update" className="w-full p-2"></TabsContent>
        <TabsContent value="close" className="w-full p-2"></TabsContent> */}
        <TabsList className="bg-transparent space-x-4">
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              disabled={tab.disabled}
              className="w-full text-center border-b-2 border-b-transparent hover:border-b-primary focus:outline-none focus:ring-0 hover:cursor-pointer focus:border-b-primary data-[state=active]:border-b-primary data-[state=active]:text-primary"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="log" className="w-full p-2 ">
          <LogForm accountId={id} />
        </TabsContent>
        <TabsContent value="edit" className="w-full p-2 ">
          <LogForm accountId={id} />
        </TabsContent>
        <TabsContent value="update" className="w-full p-2 ">
          <Executed trade={trade} />
        </TabsContent>
        <TabsContent value="close" className="w-full p-2 ">
          <CloseTrade trade={trade} />
        </TabsContent>
      </Tabs>
    </Card>
  );
}

const tabList = [
  {
    value: "log",
    label: "Log",
    disabled: false,
  },
  {
    value: "edit",
    label: "Edit",
    disabled: true,
  },
  {
    value: "update",
    label: "Update",
    disabled: false,
  },
  {
    value: "close",
    label: "Close",
    disabled: false,
  },
];
