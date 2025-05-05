import { BarChart } from "@mui/x-charts/BarChart"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"

export const Barchart = ({ type, label, id, color, filter = true }) => {
  const { userNumbers } = useContext(UserContext)

  // bcz we only show last month on dashboard
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const data =
    userNumbers[type]
      ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
      .map((item) => item.amount) || []

  const xLabels =
    userNumbers[type]
      ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
      .map((item) =>
        item.title.length > 3 ? item.title.slice(0, 3) + "..." : item.title
      ) || []

  const fullLabels =
    userNumbers[type]
      ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
      .map((item) => item.title) || []

  const fullLabelFormatter = (index) => fullLabels[index]

  return (
    <BarChart
      height={300}
      series={[
        {
          data: data,
          label: label,
          id: id,
          color: color,
          valueFormatter: (value, context) => {
            const index = context.dataIndex
            return `${fullLabelFormatter(index)}: $ ${value}`
          },
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: xLabels,
          label: "Activities",
          valueFormatter: (value, index) => fullLabelFormatter(index),
        },
      ]}
      yAxis={[{ label: "Amount" }]}
    />
  )
}

export default Barchart
