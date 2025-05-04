"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export default function TradingAccounts() {
  const accounts = [
    {
      id: "ftmo-challenge",
      name: "FTMO CHALLENGE",
      status: "live",
      balance: "$100,000",
      profit: "+$4,230",
      lastUpdated: "2 hours ago",
    },
    {
      id: "my-forex-funds",
      name: "My Forex Funds",
      status: "demo",
      balance: "$50,000",
      profit: "+$1,875",
      lastUpdated: "1 day ago",
    },
    {
      id: "funded-next",
      name: "Funded Next",
      status: "pending",
      balance: "$25,000",
      profit: "$0",
      lastUpdated: "Just now",
    },
    {
      id: "e8-funding",
      name: "E8 Funding",
      status: "failed",
      balance: "$10,000",
      profit: "-$1,200",
      lastUpdated: "3 days ago",
    },
    {
      id: "the-5percenters",
      name: "The 5%ers",
      status: "live",
      balance: "$200,000",
      profit: "+$8,450",
      lastUpdated: "5 hours ago",
    },
  ];

  const router = useRouter();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Trading Accounts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table className="border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="border-none">
              <TableHead className="border-none">Account </TableHead>
              <TableHead className="hidden md:table-cell border-none">
                Balance
              </TableHead>
              <TableHead className="hidden md:table-cell border-none">
                P&L
              </TableHead>
              <TableHead className="hidden md:table-cell border-none">
                Last Updated
              </TableHead>
              <TableHead className="border-none">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts.map((account) => (
              <TableRow
                key={account.id}
                className="border-none cursor-pointer hover:shadow-lg transition"
                onClick={() => router.push(`/accounts/${account.id}`)}
                tabIndex={0}
                role="button"
                aria-label={`View account ${account.name}`}
              >
                <TableCell className="font-medium text-muted-foreground hover:text-foreground capitalize border-none">
                  {account.name}
                </TableCell>
                <TableCell className="hidden text-muted-foreground hover:text-foreground md:table-cell border-none">
                  {account.balance}
                </TableCell>
                <TableCell
                  className={`hidden md:table-cell text-muted-foreground hover:text-foreground border-none ${
                    account.profit.startsWith("+")
                      ? "text-primary"
                      : account.profit.startsWith("-")
                      ? "text-destructive"
                      : ""
                  }`}
                >
                  {account.profit}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground border-none">
                  {account.lastUpdated}
                </TableCell>
                <TableCell
                  className={`capitalize border-none ${
                    account.status === "live"
                      ? "text-primary"
                      : account.status === "demo"
                      ? "text-muted-foreground"
                      : "text-destructive"
                  }`}
                >
                  {account.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
