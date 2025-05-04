import { BarChart } from "@mui/x-charts/BarChart"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"

export const Barchart = ({ type, label, id, color }) => {
  const { userNumbers } = useContext(UserContext)
  const data = userNumbers[type]?.map((item) => item.amount) || []
  const xLabels = userNumbers[type]?.map((item) => item.title) || []

  return (
    <BarChart
      height={300}
      series={[{ data: data, label: label, id: id, color: color }]}
      xAxis={[{ scaleType: "band", data: xLabels }]}
    />
  )
}

export default Barchart
