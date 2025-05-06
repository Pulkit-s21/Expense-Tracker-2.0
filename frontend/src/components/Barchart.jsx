import { BarChart } from "@mui/x-charts/BarChart"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import moment from "moment"

export const Barchart = ({
  type,
  label,
  id,
  color,
  height = 300,
  filter = true,
}) => {
  const { userNumbers } = useContext(UserContext)

  // bcz we only show last month on dashboard
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const filteredData =
    userNumbers[type]
      ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
      .sort((a, b) => new Date(b.date) - new Date(a.date)) || []

  //   const data =
  //     userNumbers[type]
  //       ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
  //       .map((item) => item.amount) || []

  //   const xLabels =
  //     userNumbers[type]
  //       ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
  //       .map((item) =>
  //         item.title.length > 3 ? item.title.slice(0, 3) + "..." : item.title
  //       ) || []

  //   const fullLabels =
  //     userNumbers[type]
  //       ?.filter((item) => (filter ? new Date(item.date) >= thirtyDaysAgo : true))
  //       .map((item) => item.title) || []

  //   const fullLabelFormatter = (index) => fullLabels[index]

  // Group by date and sum
  const groupedByDate = filteredData.reduce((acc, item) => {
    const date = moment(new Date(item.date).toISOString().split("T")[0])
      .local()
      .format("Do MMMM")
    if (!acc[date]) acc[date] = 0
    acc[date] += item.amount
    return acc
  }, {})

  const xLabels = Object.keys(groupedByDate)
  const data = Object.values(groupedByDate)

  return (
    <BarChart
      height={height}
      series={[
        {
          data: data,
          label: label,
          id: id,
          color: color,
          valueFormatter: (value) => {
            return `$ ${value}`
          },
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: xLabels,
        },
      ]}
      yAxis={[{ label: "Amount" }]}
    />
  )
}

export default Barchart
