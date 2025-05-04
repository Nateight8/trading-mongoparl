import TradingAccounts from "./_components/accounts";
// import TradingAccounts from "./_components/accounts";

export default function AccountsPage() {
  return (
    <>
      <div className="w-full shadow-md max-w-xl shadow-black/50 bg-background p-4 rounded-xl border">
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-bold">Overview</h1>
          <div className="bg-black/10 grid p-0.5 grid-cols-2 rounded-xl">
            <div className="bg-background h-14">
              {/* <p>Total Balance</p>
              <p>$100,000</p> */}
            </div>
            <div className="h-14">
              {/* <p>Total Balance</p>
              <p>$100,000</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full my-4 shadow-md max-w-xl shadow-black/50 bg-muted/50 rounded-xl border">
        <TradingAccounts />
      </div>
    </>
  );
}
