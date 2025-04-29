import { PieChart } from "@mui/x-charts"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"

export const Chart = () => {
  const { total } = useContext(UserContext)

  return (
    <PieChart
      series={[
        {
          highlightScope: { fade: "global", highlight: "item" },
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: "gray",
          },
          // arcLabel: (item) => `${item.value}%`, // TODO: Figure out how to show % for each column
          data: [
            { id: 0, value: total.balance, label: "Total Balance" },
            { id: 1, value: total.income, label: "Total Income" },
            { id: 2, value: total.expense, label: "Total Expense" },
          ],
        },
      ]}
      width={300}
      height={300}
    />
  )
}
