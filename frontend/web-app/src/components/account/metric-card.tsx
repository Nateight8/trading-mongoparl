import { IconTrendingUp } from "@tabler/icons-react";

export default function MetricCard({
  tradingCapital,
  roi = 18,
  comparisonLabel,
}: {
  tradingCapital?: number;
  roi?: number;
  comparisonLabel: string;
}) {
  return (
    <div className="flex-1 rounded-lg  shadow-sm border shadow-black">
      <div className="flex w-fit  gap-4 p-8 justify-between items-center ">
        <h3 className="text-5xl text-muted-foreground font-bold">
          <span className="text-primary">$ </span>
          {tradingCapital?.toLocaleString()}
        </h3>
        <div className="flex flex-col text-primary">
          <div className="flex items-center gap-2">
            <p className=" font-bold">+{roi}%</p>
            <IconTrendingUp />
          </div>

          <p className="text-muted-foreground text-xs ">{comparisonLabel}</p>
        </div>
      </div>
    </div>
  );
}

// fayokeajewole
