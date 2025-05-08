"use client";
import { useQuery } from "@apollo/client";
import Assets from "./assets";
// import Overview from "./overview";
import accountOperations, { UserTradeData } from "@/graphql/operations/account";

import Overview from "./overview";

export default function Accounts() {
  // TODO: get user's accounts from the database
  const {
    data,
    loading,
    // error,
  } = useQuery<{ userTradeData: UserTradeData }>(
    accountOperations.Querries.userTradData,
    {
      fetchPolicy: "network-only",
    }
  );

  console.log("DATA FROM RESOLVER", data?.userTradeData.overview.chartData);

  if (loading) return <div>Loading...</div>;

  const overview = data?.userTradeData.overview;
  const accounts = data?.userTradeData.accounts;

  return (
    <div className=" w-full max-w-7xl mx-auto flex flex-col gap-6 ">
      <Overview
        currentCapital={overview?.currentBalance ?? 0}
        roi={overview?.roi ?? 0}
        overview={overview!}
        // overview={
        //   overview
        //     ? { ...overview, name: "Portfolio Overview", chartData: [] }
        //     : { name: "Portfolio Overview", chartData: [] }
        // }
      />
      <Assets accounts={accounts} />
    </div>
  );
}

// const traderData = {
//   currentCapital: 45386,
//   roi: 22.8,

//   overview: {
//     currentBalance: 45386,
//     roi: 22.8,
//     name: "Portfolio Overview",
//     chartData: [
//       { id: "ovr0000001", month: "2024-12-01", actual: 0, projected: 0 },
//       {
//         id: "ovr0000002",
//         month: "2024-12-05",
//         actual: 38450,
//         projected: 38000,
//       },
//       {
//         id: "ovr0000003",
//         month: "2024-12-10",
//         actual: 34250,
//         projected: 39000,
//       },
//       {
//         id: "ovr0000004",
//         month: "2024-12-15",
//         actual: 36600,
//         projected: 37500,
//       },
//       {
//         id: "ovr0000005",
//         month: "2024-12-20",
//         actual: 33900,
//         projected: 38500,
//       },
//       {
//         id: "ovr0000006",
//         month: "2024-12-25",
//         actual: 35350,
//         projected: 36000,
//       },
//       {
//         id: "ovr0000007",
//         month: "2024-12-31",
//         actual: 41200,
//         projected: 39000,
//       },
//       {
//         id: "ovr0000008",
//         month: "2025-01-05",
//         actual: 39800,
//         projected: 42500,
//       },
//       {
//         id: "ovr0000009",
//         month: "2025-01-10",
//         actual: 42150,
//         projected: 41000,
//       },
//       {
//         id: "ovr0000010",
//         month: "2025-01-15",
//         actual: 38200,
//         projected: 43000,
//       },
//       {
//         id: "ovr0000011",
//         month: "2025-01-20",
//         actual: 36500,
//         projected: 39000,
//       },
//       {
//         id: "ovr0000012",
//         month: "2025-01-25",
//         actual: 40250,
//         projected: 38500,
//       },
//       {
//         id: "ovr0000013",
//         month: "2025-01-31",
//         actual: 44700,
//         projected: 42000,
//       },
//       {
//         id: "ovr0000014",
//         month: "2025-02-05",
//         actual: 41850,
//         projected: 46000,
//       },
//       {
//         id: "ovr0000015",
//         month: "2025-02-10",
//         actual: 43300,
//         projected: 43000,
//       },
//       {
//         id: "ovr0000016",
//         month: "2025-02-15",
//         actual: 47400,
//         projected: 45000,
//       },
//       {
//         id: "ovr0000017",
//         month: "2025-02-20",
//         actual: 42200,
//         projected: 48500,
//       },
//       {
//         id: "ovr0000018",
//         month: "2025-02-25",
//         actual: 38800,
//         projected: 41000,
//       },
//       {
//         id: "ovr0000019",
//         month: "2025-03-01",
//         actual: 45386,
//         projected: 42000,
//       },
//     ],
//   },

//   accounts: [
//     {
//       id: "acct000001",
//       name: "Funded Next",
//       currentBalance: 18750,
//       roi: 8.5,
//       winrate: 58,
//       pnl: 3750,
//       chartData: [
//         { id: "fdn0000001", month: "2024-12-01", actual: 0, projected: 0 },
//         {
//           id: "fdn0000002",
//           month: "2024-12-01",
//           actual: 15000,
//           projected: 15000,
//         },
//         {
//           id: "fdn0000003",
//           month: "2024-12-05",
//           actual: 15850,
//           projected: 15500,
//         },
//         {
//           id: "fdn0000004",
//           month: "2024-12-10",
//           actual: 13900,
//           projected: 16000,
//         },
//         {
//           id: "fdn0000005",
//           month: "2024-12-15",
//           actual: 14800,
//           projected: 14500,
//         },
//         {
//           id: "fdn0000006",
//           month: "2024-12-20",
//           actual: 13400,
//           projected: 15500,
//         },
//         {
//           id: "fdn0000007",
//           month: "2024-12-25",
//           actual: 14200,
//           projected: 14000,
//         },
//         {
//           id: "fdn0000008",
//           month: "2024-12-31",
//           actual: 16550,
//           projected: 15500,
//         },
//         {
//           id: "fdn0000009",
//           month: "2025-01-05",
//           actual: 15600,
//           projected: 17250,
//         },
//         {
//           id: "fdn0000010",
//           month: "2025-01-10",
//           actual: 16900,
//           projected: 16000,
//         },
//         {
//           id: "fdn0000011",
//           month: "2025-01-15",
//           actual: 15250,
//           projected: 17500,
//         },
//         {
//           id: "fdn0000012",
//           month: "2025-01-20",
//           actual: 14200,
//           projected: 16000,
//         },
//         {
//           id: "fdn0000013",
//           month: "2025-01-25",
//           actual: 16800,
//           projected: 15000,
//         },
//         {
//           id: "fdn0000014",
//           month: "2025-01-31",
//           actual: 19400,
//           projected: 17500,
//         },
//         {
//           id: "fdn0000015",
//           month: "2025-02-05",
//           actual: 17950,
//           projected: 20000,
//         },
//         {
//           id: "fdn0000016",
//           month: "2025-02-10",
//           actual: 19700,
//           projected: 18500,
//         },
//         {
//           id: "fdn0000017",
//           month: "2025-02-15",
//           actual: 21800,
//           projected: 20000,
//         },
//         {
//           id: "fdn0000018",
//           month: "2025-02-20",
//           actual: 19200,
//           projected: 22500,
//         },
//         {
//           id: "fdn0000019",
//           month: "2025-02-25",
//           actual: 16900,
//           projected: 18000,
//         },
//         {
//           id: "fdn0000020",
//           month: "2025-03-01",
//           actual: 18750,
//           projected: 17500,
//         },
//       ],
//     },
//     {
//       id: "acct000002",
//       name: "Goatfunded",
//       currentBalance: 9000,
//       roi: -2.3,
//       winrate: 40,
//       pnl: -500,
//       chartData: [
//         {
//           id: "gtf0000001",
//           month: "2024-12-01",
//           actual: 12000,
//           projected: 12000,
//         },
//         {
//           id: "gtf0000002",
//           month: "2024-12-05",
//           actual: 11500,
//           projected: 12500,
//         },
//         {
//           id: "gtf0000003",
//           month: "2024-12-10",
//           actual: 11000,
//           projected: 12750,
//         },
//         {
//           id: "gtf0000004",
//           month: "2024-12-15",
//           actual: 10500,
//           projected: 11500,
//         },
//         {
//           id: "gtf0000005",
//           month: "2024-12-20",
//           actual: 10000,
//           projected: 12750,
//         },
//         {
//           id: "gtf0000006",
//           month: "2024-12-25",
//           actual: 9500,
//           projected: 11750,
//         },
//         {
//           id: "gtf0000007",
//           month: "2024-12-31",
//           actual: 9000,
//           projected: 12500,
//         },
//         {
//           id: "gtf0000008",
//           month: "2025-01-05",
//           actual: 9000,
//           projected: 13750,
//         },
//         {
//           id: "gtf0000009",
//           month: "2025-01-10",
//           actual: 9000,
//           projected: 12750,
//         },
//         {
//           id: "gtf0000010",
//           month: "2025-01-15",
//           actual: 9000,
//           projected: 14000,
//         },
//         {
//           id: "gtf0000011",
//           month: "2025-01-20",
//           actual: 9000,
//           projected: 12500,
//         },
//         {
//           id: "gtf0000012",
//           month: "2025-01-25",
//           actual: 9000,
//           projected: 12000,
//         },
//         {
//           id: "gtf0000013",
//           month: "2025-01-31",
//           actual: 9000,
//           projected: 13500,
//         },
//         {
//           id: "gtf0000014",
//           month: "2025-02-05",
//           actual: 9000,
//           projected: 14750,
//         },
//         {
//           id: "gtf0000015",
//           month: "2025-02-10",
//           actual: 9000,
//           projected: 13500,
//         },
//         {
//           id: "gtf0000016",
//           month: "2025-02-15",
//           actual: 9000,
//           projected: 13000,
//         },
//         {
//           id: "gtf0000017",
//           month: "2025-02-20",
//           actual: 9000,
//           projected: 14250,
//         },
//         {
//           id: "gtf0000018",
//           month: "2025-02-25",
//           actual: 9000,
//           projected: 12000,
//         },
//         {
//           id: "gtf0000020",
//           month: "2025-03-01",
//           actual: 9000,
//           projected: 13000,
//         },
//       ],
//     },
//     {
//       id: "acct000003",
//       name: "Alpha Capital",
//       currentBalance: 12400,
//       roi: 7.6,
//       winrate: 60,
//       pnl: 2400,
//       chartData: [
//         { id: "alp0000001", month: "2024-12-01", actual: 0, projected: 0 },
//         {
//           id: "alp0000002",
//           month: "2024-12-01",
//           actual: 10000,
//           projected: 10000,
//         },
//         {
//           id: "alp0000003",
//           month: "2024-12-05",
//           actual: 10250,
//           projected: 10500,
//         },
//         {
//           id: "alp0000004",
//           month: "2024-12-10",
//           actual: 9250,
//           projected: 10750,
//         },
//         {
//           id: "alp0000005",
//           month: "2024-12-15",
//           actual: 9400,
//           projected: 9500,
//         },
//         {
//           id: "alp0000006",
//           month: "2024-12-20",
//           actual: 9150,
//           projected: 10000,
//         },
//         {
//           id: "alp0000007",
//           month: "2024-12-25",
//           actual: 9200,
//           projected: 9500,
//         },
//         {
//           id: "alp0000008",
//           month: "2024-12-31",
//           actual: 11450,
//           projected: 10000,
//         },
//         {
//           id: "alp0000009",
//           month: "2025-01-05",
//           actual: 11850,
//           projected: 11750,
//         },
//         {
//           id: "alp0000010",
//           month: "2025-01-10",
//           actual: 11450,
//           projected: 12250,
//         },
//         {
//           id: "alp0000011",
//           month: "2025-01-15",
//           actual: 10800,
//           projected: 11750,
//         },
//         {
//           id: "alp0000012",
//           month: "2025-01-20",
//           actual: 10800,
//           projected: 11000,
//         },
//         {
//           id: "alp0000013",
//           month: "2025-01-25",
//           actual: 10750,
//           projected: 11000,
//         },
//         {
//           id: "alp0000014",
//           month: "2025-01-31",
//           actual: 11150,
//           projected: 11000,
//         },
//         {
//           id: "alp0000015",
//           month: "2025-02-05",
//           actual: 10800,
//           projected: 11500,
//         },
//         {
//           id: "alp0000016",
//           month: "2025-02-10",
//           actual: 11250,
//           projected: 11000,
//         },
//         {
//           id: "alp0000017",
//           month: "2025-02-15",
//           actual: 11800,
//           projected: 11500,
//         },
//         {
//           id: "alp0000018",
//           month: "2025-02-20",
//           actual: 10900,
//           projected: 12250,
//         },
//         {
//           id: "alp0000019",
//           month: "2025-02-25",
//           actual: 10500,
//           projected: 11000,
//         },
//         {
//           id: "alp0000020",
//           month: "2025-03-01",
//           actual: 12400,
//           projected: 11500,
//         },
//       ],
//     },
//   ],
// };
