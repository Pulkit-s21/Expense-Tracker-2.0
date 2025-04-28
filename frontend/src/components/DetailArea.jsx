import { OverviewArea } from "./OverviewArea"
import { QuickInfoArea } from "./QuickInfoArea"
import { RecentTransactionArea } from "./RecentTransactionArea"

export const DetailArea = () => {
  return (
    <div className="flex flex-col w-[80%] pr-4">
      <QuickInfoArea />

      {/* recent & chart */}
      <div className="flex gap-4 mt-10">
        <RecentTransactionArea />

        <OverviewArea />
      </div>
    </div>
  )
}
