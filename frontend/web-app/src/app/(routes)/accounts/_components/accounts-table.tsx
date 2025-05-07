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
import { TradingAccount } from "@/graphql/operations/account";
import { formatBalance } from "@/lib/utils";

export default function AccountsTable({
  data,
}: {
  data: TradingAccount[] | undefined;
}) {
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
            {data?.map((account) => (
              <TableRow
                key={account.id}
                className="border-none cursor-pointer hover:shadow-lg  transition"
                onClick={() => router.push(`/accounts/${account.id}`)}
                tabIndex={0}
                role="button"
                aria-label={`View account ${account.accountName}`}
              >
                <TableCell className="font-medium text-muted-foreground hover:text-foreground capitalize border-none">
                  {account.accountName}
                </TableCell>
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {formatBalance(account.currentBalance)}{" "}
                  {account.accountCurrency}
                </TableCell>
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {account.pnl !== undefined ? formatBalance(account.pnl) : "-"}{" "}
                  {account.accountCurrency}
                </TableCell>
                <TableCell className="text-muted-foreground hover:text-foreground border-none">
                  {account.winrate !== undefined ? account.winrate + "%" : "-"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
