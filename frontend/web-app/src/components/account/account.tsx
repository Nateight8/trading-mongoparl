import { IconTrendingUp } from "@tabler/icons-react";

export default function Account({
  balance,
  pnl,
  winrate,
}: {
  balance: number;
  pnl: number;
  winrate: number;
}) {
  return (
    <div className=" w-full hover:cursor-pointer hover:bg-muted  shadow-black shadow-sm rounded-lg border p-8">
      <div className="flex justify-between items-center">
        <div className="">
          <h3 className="text-lg font-bold">Account</h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold">Account #:</span> *****890
          </p>
        </div>
        <div className="h-full p-3 border rounded-2xl">
          <IconTrendingUp className="text-primary" />
        </div>
      </div>
      {/* stats */}
      <div className="flex justify-between items-center">
        <div className="py-4">
          <p className="text-sm text-muted-foreground">Balance</p>
          <h3 className="text-2xl font-bold">{balance.toLocaleString()} USD</h3>
        </div>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">P&L</p>
          <h3 className="text-2xl font-bold">{pnl.toLocaleString()} USD</h3>
        </div>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">Win Rate</p>
          <h3 className="text-2xl font-bold">{winrate}%</h3>
        </div>
      </div>
    </div>
  );
}
