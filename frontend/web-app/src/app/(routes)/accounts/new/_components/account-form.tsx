"use client";

import { useForm, UseFormReturn } from "react-hook-form";
import { useId, useState } from "react";
import { z } from "zod";
import {
  FormControl,
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import accountOperations from "@/graphql/operations/account";
import { useRouter } from "next/navigation";
const accountFormSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  broker: z.string().min(2, "Broker is required"),
  accountCurrency: z.string().min(1, "Currency is required"),
  accountSize: z.string().min(1, "Account size is required"),
  maxDailyDrawdown: z.coerce.number().min(1, "Max daily drawdown is required"),
  maxTotalDrawdown: z.coerce.number().min(1, "Max total drawdown is required"),
});

type AccountFormFields = z.infer<typeof accountFormSchema>;

export default function AccountForm() {
  const form = useForm<AccountFormFields>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      accountName: "",
      broker: "",
      accountCurrency: "",
      accountSize: "",
      maxDailyDrawdown: 0,
      maxTotalDrawdown: 0,
    },
  });

  const router = useRouter();

  const [createAccount, { loading }] = useMutation(
    accountOperations.Mutations.createAccount,
    {
      onCompleted: () => {
        form.reset();
        router.push("/accounts");
      },
    }
  );

  const onSubmit = (data: AccountFormFields) => {
    console.log(data);
    createAccount({ variables: data });
  };

  return (
    <div className="w-full max-w-xl mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2 pb-4">
          <h1 className="text-2xl font-bold">Manage Account</h1>
          <p className="text-sm text-muted-foreground">
            Add a new trading account to your account.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormFields form={form} />
            <Button type="submit" className="w-full my-4">
              {loading ? "Adding Account..." : "Add Account"}
            </Button>
          </form>
        </Form>

        <div className="flex items-center gap-2"></div>
      </div>
    </div>
  );
}

export function FormFields({
  form,
}: {
  form: UseFormReturn<AccountFormFields>;
}) {
  const id = useId();
  const [customMode, setCustomMode] = useState(false);
  const optionCellClass =
    "w-full min-w-[110px] max-w-[130px] box-border flex items-center justify-center";
  const optionButtonClass =
    "w-full p-2 font-bold text-muted-foreground hover:cursor-pointer bg-card rounded-md border border-border hover:border-primary/50 transition-colors text-sm font-medium text-foreground text-center box-border";

  return (
    <div className="space-y-8">
      <FormField
        control={form.control}
        name="accountName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Account Name</FormLabel>
            <FormControl>
              <Input placeholder="eg: FTMO CHALLENGE." {...field} />
            </FormControl>
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="broker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Broker / Prop Firm</FormLabel>
              <FormControl>
                <Input placeholder="eg: FTMO" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="accountCurrency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  defaultValue=""
                >
                  <SelectTrigger className="w-full bg-background">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="NGN">NGN</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="accountSize"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <fieldset className="space-y-4">
                <legend className="text-foreground text-sm leading-none font-medium">
                  Account Size / Starting Balance
                </legend>
                <RadioGroup
                  className="grid grid-cols-3 gap-2"
                  defaultValue="1"
                  onValueChange={(val) => {
                    field.onChange(val);
                    setCustomMode(false);
                  }}
                  value={field.value}
                >
                  {items.map((item) => (
                    <label
                      key={`${id}-${item.value}`}
                      className={`${optionCellClass} border-input hover:border-primary/50 hover:cursor-pointer has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex flex-col items-center gap-3 rounded-md border py-3 text-center shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px] has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50`}
                    >
                      <RadioGroupItem
                        id={`${id}-${item.value}`}
                        value={item.value}
                        className="sr-only after:absolute after:inset-0"
                      />
                      <p className="text-foreground text-sm leading-none font-medium">
                        {item.label}
                      </p>
                    </label>
                  ))}
                  <div className={optionCellClass}>
                    {customMode ? (
                      <Input
                        autoFocus
                        placeholder="Custom"
                        className={optionButtonClass}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        onBlur={() => {
                          if (!field.value) setCustomMode(false);
                        }}
                      />
                    ) : (
                      <button
                        type="button"
                        className={optionButtonClass}
                        onClick={() => setCustomMode(true)}
                      >
                        Custom
                      </button>
                    )}
                  </div>
                </RadioGroup>
              </fieldset>
            </FormControl>
          </FormItem>
        )}
      />
      <div className="bg-muted/90 rounded-lg border border-dashed border-border p-4 mb-4">
        <h3 className="text-sm font-semibold mb-2">
          Account Rules (Breach = Account Failure)
        </h3>
        <div className="grid grid-cols-2 gap-4 py-4">
          <FormField
            control={form.control}
            name="maxDailyDrawdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Daily Drawdown (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 5%"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                    Maximum loss allowed in a single day
                  </FormDescription> */}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxTotalDrawdown"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Max Total Drawdown (%)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="eg: 10%"
                    className="bg-background"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                    Maximum overall loss allowed
                  </FormDescription> */}
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center mt-1">
          <div className="w-4 h-4 flex items-center justify-center bg-primary/20 rounded-full text-primary mr-2">
            ?
          </div>
          <p className="text-xs text-muted-foreground">
            This can be personal limits for personal account or limit set by
            your preferred prop firm that cannot be exceeded
          </p>
        </div>
      </div>
      <div className="p-4 bg-primary/5 rounded-lg border border-dashed border-primary/30 mb-2">
        <h3 className="text-sm font-semibold mb-1">Common Prop Firm Rules</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => {
              form.setValue("maxDailyDrawdown", 5);
              form.setValue("maxTotalDrawdown", 10);
            }}
            className="p-2 hover:cursor-pointer bg-card rounded border border-border hover:border-primary/50 transition-colors"
          >
            <span className="font-medium">FTMO Standard</span>
            <p className="text-muted-foreground">5% daily / 10% max</p>
          </button>
          <button
            type="button"
            onClick={() => {
              form.setValue("maxDailyDrawdown", 4);
              form.setValue("maxTotalDrawdown", 8);
            }}
            className="p-2 hover:cursor-pointer bg-card rounded border border-border hover:border-primary/50 transition-colors"
          >
            <span className="font-medium">True Forex</span>
            <p className="text-muted-foreground">4% daily / 8% max</p>
          </button>
        </div>
      </div>
    </div>
  );
}

const items = [
  { value: "5000", label: "$5,000" },
  { value: "10000", label: "$10,000" },
  { value: "20000", label: "$20,000" },
  { value: "50000", label: "$50,000" },
  { value: "100000", label: "$100,000" },
];
