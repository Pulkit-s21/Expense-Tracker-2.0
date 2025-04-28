import { Chart } from "./Chart"

export const OverviewArea = () => {
  return (
    <div className="flex flex-col gap-4 bg-white w-[60%] p-4">
      <p className="font-thin">Financial Overview</p>

      <Chart />
    </div>
  )
}
