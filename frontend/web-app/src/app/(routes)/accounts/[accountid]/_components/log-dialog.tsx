import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LogForm } from "./log-form";

export default function Component() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Log Trade</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true"
          >
            <svg
              className="stroke-zinc-800 dark:stroke-zinc-100"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
              aria-hidden="true"
            >
              <circle cx="16" cy="16" r="12" fill="none" strokeWidth="8" />
            </svg>
          </div>
          <DialogHeader>
            <DialogTitle className="sm:text-center">Plan the trade</DialogTitle>
            <DialogDescription className="sm:text-center">
              Plan the trade to this account.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* <Form {...form}>
          <form className="space-y-5"> */}
        <LogForm />
        <Button type="button" className="w-full">
          Log Trade
        </Button>
        {/* </form>
        </Form> */}
      </DialogContent>
    </Dialog>
  );
}
