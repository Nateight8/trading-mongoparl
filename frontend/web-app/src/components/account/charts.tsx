import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 03 - Crafted.is",
};

import { Chart02 } from "./chart-02";
import { Account } from "./assets";

export default function Charts({ accounts }: { accounts: Account[] }) {
  const chartDataSets = accounts.map((account) => ({
    name: account.name,
    currentBalance: account.currentBalance,
    roi: account.roi,
    winrate: account.winrate,
    pnl: account.pnl,
    chartData: account.chartData,
  }));

  return (
    <div className=" @container">
      <div className="w-full max-w-6xl mx-auto">
        <div className="">
          <div className="grid gap-4 py-4 auto-rows-min @2xl:grid-cols-2 ">
            {chartDataSets?.map((account) => (
              <Chart02
                key={account.name}
                name={account.name}
                currentBalance={account.currentBalance}
                roi={account.roi ?? 0}
                chartData={account.chartData ?? []}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
