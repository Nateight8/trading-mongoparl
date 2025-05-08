"use client";

import tradeOperations, { TradeProps } from "@/graphql/operations/trade";

import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
export const executeTradeSchema = z.object({
  executedEntryPrice: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Entry price must be a positive number",
    }),
  executedStopLoss: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "Stop loss must be a positive number",
    }),
  executionNotes: z.string().max(1000).optional(),
});

export default function Executed({ trade }: { trade: TradeProps }) {
  console.log(trade);

  const form = useForm<z.infer<typeof executeTradeSchema>>({
    resolver: zodResolver(executeTradeSchema),
    defaultValues: {
      //   executedEntryPrice: trade.plannedEntryPrice,
      //   executedStopLoss: trade.plannedStopLoss,
      //   executionNotes: "",
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="executedEntryPrice"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="adjusted entry?" {...field} />
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
                  <FormControl>
                    <Input placeholder="adjusted sl?" {...field} />
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
                <FormControl>
                  <Textarea placeholder="your execution notes" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full">Confirm</Button>
        </form>
      </Form>
      <button
        onClick={() => {
          form.setValue("executedEntryPrice", trade.plannedEntryPrice!);
          form.setValue("executedStopLoss", trade.plannedStopLoss!);
        }}
        className="text-xs hover:text-primary focus:outline-none p-2 cursor-pointer shadow-sm"
        type="button"
      >
        Apply logged values if unchanged
      </button>
    </>
  );
}
