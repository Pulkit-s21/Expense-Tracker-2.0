import { OverviewArea } from "./OverviewArea"
import { QuickInfoArea } from "./QuickInfoArea"
import { RecentTransactionArea } from "./RecentTransactionArea"
import { getUserTransactions } from "../services/authServices"
import { getTransactions } from "../services/transactionServices"
import { getIncomes } from "../services/incomeServices"
import { Chart } from "./Chart"
import { Barchart } from "./Barchart"

export const DetailArea = () => {
  const limit = 7
  return (
    <div className="flex flex-col gap-6 w-[85%] pr-4 py-6">
      <QuickInfoArea />

      {/* recent & chart */}
      <div className="flex gap-4">
        <RecentTransactionArea
          detailFunc={getUserTransactions}
          heading={"Recent Transactions"}
          limit={limit}
        />

        <OverviewArea heading={"Financial Overview"} component={<Chart />} />
      </div>

      {/* expense & chart */}
      <div className="flex gap-4">
        <RecentTransactionArea
          detailFunc={getTransactions}
          heading={"Recent Expenses"}
          limit={limit}
          page={"/expense"}
        />

        <OverviewArea
          heading={"Last 30 days expenses"}
          component={
            <Barchart
              type="expense"
              label="Expense"
              id="expenseId"
              height="300"
              color="red"
            />
          }
        />
      </div>

      {/* income & chart */}
      <div className="flex gap-4">
        <OverviewArea
          heading={"Last 30 days incomes"}
          component={
            <Barchart
              type="income"
              label="Income"
              id="incomeId"
              height="300"
              color="lightGreen"
            />
          }
        />

        <RecentTransactionArea
          detailFunc={getIncomes}
          heading={"Recent Incomes"}
          limit={limit}
          page={"/income"}
        />
      </div>
    </div>
  )
}
