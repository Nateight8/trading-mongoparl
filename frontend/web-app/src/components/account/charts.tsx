import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 03 - Crafted.is",
};

import { Chart02 } from "./chart-02";

export default function Charts() {
  return (
    <>
      <>
        <div className=" @container">
          <div className="w-full max-w-6xl mx-auto">
            <div className="">
              <div className="grid gap-4 py-4 auto-rows-min @2xl:grid-cols-2 ">
                <Chart02 />
                <Chart02 />
                <Chart02 />
                <Chart02 />
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
