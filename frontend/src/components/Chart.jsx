import { PieChart } from "@mui/x-charts"

export const Chart = () => {
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
            { id: 0, value: 22000, label: "Total Balance" },
            { id: 1, value: 30000, label: "Total Income" },
            { id: 2, value: 8000, label: "Total Expense" },
          ],
        },
      ]}
      width={300}
      height={300}
    />
  )
}
