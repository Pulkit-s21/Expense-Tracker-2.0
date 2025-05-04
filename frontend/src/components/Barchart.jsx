import { BarChart } from "@mui/x-charts/BarChart"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"

export const Barchart = ({ type, label, id, color }) => {
  const { userNumbers } = useContext(UserContext)

  // bcz we only show last month on dashboard
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  const data =
    userNumbers[type]
      ?.filter((item) => new Date(item.date) >= thirtyDaysAgo)
      .map((item) => item.amount) || []

  const xLabels =
    userNumbers[type]
      ?.filter((item) => new Date(item.date) >= thirtyDaysAgo)
      .map((item) => item.title) || []

  return (
    <BarChart
      height={300}
      series={[{ data: data, label: label, id: id, color: color }]}
      xAxis={[{ scaleType: "band", data: xLabels }]}
    />
  )
}

export default Barchart
