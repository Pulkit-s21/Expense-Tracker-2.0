import { UserInfo } from "../components/UserInfo"
import { Barchart } from "../components/Barchart"

export const Income = () => {
  return (
    <div className="bg-gray-50 h-full text-black font-semibold flex gap-6">
      <UserInfo />

      <div className="flex flex-col gap-4 py-6 pr-4 w-full">
        <Barchart
          type="income"
          label="Income"
          id="incomeId"
          color="lightGreen"
          filter={false}
        />
      </div>
    </div>
  )
}
