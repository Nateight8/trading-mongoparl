"use client";

import { CircleAlertIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import tradeOperations, { TradeProps } from "@/graphql/operations/trade";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
export const executeTradeSchema = z.object({
  //   id: z.string().min(1, "Trade ID is required"),
  //   status: z.literal("OPEN"), // Always set to OPEN for execution
  executedEntryPrice: z.number().positive("Entry price must be positive"),
  executedStopLoss: z.number().positive("Stop loss must be positive"),
  executionNotes: z.string().max(1000).optional(),
});

export default function Executed({
  onClose,
  trade,
}: {
  onClose: () => void;
  trade: TradeProps;
}) {
  const form = useForm<z.infer<typeof executeTradeSchema>>({
    resolver: zodResolver(executeTradeSchema),
    defaultValues: {
      //   id: trade.id,
      //   status: "OPEN",
      executedEntryPrice: trade.plannedEntryPrice,
      executedStopLoss: trade.plannedStopLoss,
      executionNotes: "",
    },
  });

  const [executeTrade] = useMutation(tradeOperations.Mutations.executeTrade);

  function onSubmit(data: z.infer<typeof executeTradeSchema>) {
    console.log("executed", data);
    executeTrade({
      variables: {
        input: {
          id: trade.id,
          ...data,
        },
      },
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Confirm Execution</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <CircleAlertIcon className="opacity-80" size={16} />
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">
              Confirm Execution
            </DialogTitle>
            <DialogDescription className="sm:text-center">
              Change the entry price, stop loss if you entered at a different
              price than the original entry price or stop loss. Add any
              additional notes about the execution(optional).
            </DialogDescription>
          </DialogHeader>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="executedEntryPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entry Price</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. 1.2345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="executedStopLoss"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stop Loss</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. 1.2345" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="executionNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Execution Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="your execution notes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Confirm Execution</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
