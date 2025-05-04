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

type AccountStat = {
  id: number;
  name: string;
  balance: number;
  pnl: number;
  winrate: number;
};

export default function AccountsTable({ data }: { data: AccountStat[] }) {
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
              <TableHead className="border-none">Account</TableHead>
              <TableHead className="border-none">Balance</TableHead>
              <TableHead className="border-none">P&L</TableHead>
              <TableHead className="border-none">Win Rate</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((account) => (
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
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {account.balance.toLocaleString()} USD
                </TableCell>
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {account.pnl.toLocaleString()} USD
                </TableCell>
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {account.winrate}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
