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

import { useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
export const executeTradeSchema = z.object({
  //   id: z.string().min(1, "Trade ID is required"),
  //   status: z.literal("OPEN"), // Always set to OPEN for execution
  closed: z.number().positive("Entry price must be positive"),
});

export default function CloseTrade({ trade }: { trade: TradeProps }) {
  const form = useForm<z.infer<typeof executeTradeSchema>>({
    resolver: zodResolver(executeTradeSchema),
    defaultValues: {
      closed: undefined,
    },
  });

  const [executeTrade] = useMutation(tradeOperations.Mutations.executeTrade);

  function onSubmit(data: z.infer<typeof executeTradeSchema>) {
    console.log("executed", data);
    executeTrade({
      variables: {},
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="closed"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="closing price" {...field} />
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
          form.setValue("closed", trade.plannedEntryPrice!);
        }}
        className="text-xs hover:text-primary focus:outline-none p-2 cursor-pointer shadow-sm"
        type="button"
      >
        Click if you held to TP
      </button>
    </>
  );
}
