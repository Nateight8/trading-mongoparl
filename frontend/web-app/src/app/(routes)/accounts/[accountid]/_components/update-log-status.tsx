import { CircleAlertIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import UpdateLog from "./update-log";
import Executed from "./executed";
import { TradeProps } from "@/graphql/operations/trade";

export default function UpdateLogStatus({
  isOpen,
  setIsOpen,
  trade,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trade: TradeProps;
}) {
  //   console.log(trade?.status);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Alert dialog with icon</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Trader! Quick update on your trade: Edit details or confirm
              execution ✓
            </AlertDialogTitle>
            <AlertDialogDescription>
              Choose an action to manage your active trade position
            </AlertDialogDescription>
          </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <UpdateLog onClose={() => setIsOpen(false)} trade={trade} />
          {trade?.status === "PENDING" ? (
            <Executed onClose={() => setIsOpen(false)} trade={trade} />
          ) : null}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
