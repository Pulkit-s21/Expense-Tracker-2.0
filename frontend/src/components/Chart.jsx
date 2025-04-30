import { PieChart } from "@mui/x-charts"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"

export const Chart = () => {
  const { total } = useContext(UserContext)

  return (
    <PieChart
      series={[
        {
          highlightScope: { fade: "global", highlight: "item" }, // animation on hover
          faded: {
            innerRadius: 30,
            additionalRadius: -30,
            color: "gray",
          },
          arcLabel: (item) => {
            const totalValue = total.balance + total.income + total.expense
            const percentage = ((item.value / totalValue) * 100).toFixed(0)
            return `${percentage}%`
          },
          data: [
            { id: 0, value: total.balance, label: "Total Balance" },
            { id: 1, value: total.income, label: "Total Income" },
            { id: 2, value: total.expense, label: "Total Expense" },
          ],
        },
      ]}
      slotProps={{
        legend: { hidden: false },
      }}
      width={300}
      height={300}
    />
  )
}
