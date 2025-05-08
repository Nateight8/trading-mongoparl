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
  exitPrice: z
  .string()
  .transform((val) => parseFloat(val))
  .refine((val) => !isNaN(val) && val > 0, {
    message: "Stop loss must be a positive number",
  }),
});

export default function CloseTrade({ trade }: { trade: TradeProps }) {
  const form = useForm<z.infer<typeof executeTradeSchema>>({
    resolver: zodResolver(executeTradeSchema),
    defaultValues: {
      exitPrice: undefined,
    },
  });

  const [closeTrade] = useMutation(tradeOperations.Mutations.closeTrade);

  function onSubmit(data: z.infer<typeof executeTradeSchema>) {
    console.log("executed", data);
    closeTrade({
      variables: {
        input: {
          tradeId: trade.id,
          exitPrice: data.exitPrice
        }
      },
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
            name="exitPrice"
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
          form.setValue("exitPrice", trade.plannedEntryPrice!);
        }}
        className="text-xs hover:text-primary focus:outline-none p-2 cursor-pointer shadow-sm"
        type="button"
      >
        Click if you held to TP
      </button>
    </>
  );
}
