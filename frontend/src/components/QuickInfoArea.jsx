import { QuickInfoBox } from "./QuickInfoBox"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext.jsx"

export const QuickInfoArea = () => {
  const { totalExpense } = useContext(UserContext)

  const quickInfo = [
    { logo: "", title: "Total Balance", amount: "22000", type: "balance" },
    { logo: "", title: "Total Income", amount: "30000", type: "income" },
    {
      logo: "",
      title: "Total Expense",
      amount: totalExpense,
      type: "transaction",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4 mt-4">
      {quickInfo.map((box, idx) => {
        return (
          <QuickInfoBox
            key={idx}
            logo={box.logo}
            title={box.title}
            amount={box.amount}
            type={box.type}
          />
        )
      })}
    </div>
  )
}
