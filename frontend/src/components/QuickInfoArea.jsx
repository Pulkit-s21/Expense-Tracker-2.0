import { QuickInfoBox } from "./QuickInfoBox"
import { useContext } from "react"
import { UserContext } from "../helpers/UserContext.jsx"
import { IoWalletOutline } from "react-icons/io5"
import { GiTakeMyMoney } from "react-icons/gi"
import { FaSackDollar } from "react-icons/fa6"

export const QuickInfoArea = () => {
  const { total } = useContext(UserContext)

  const quickInfo = [
    {
      logo: <FaSackDollar color="white" />,
      title: "Total Balance",
      amount: total.balance,
      type: "balance",
      color: "bg-blue-500",
    },
    {
      logo: <IoWalletOutline color="white" />,
      title: "Total Income",
      amount: total.income,
      type: "income",
      color: "bg-green-500",
    },
    {
      logo: <GiTakeMyMoney color="white" />,
      title: "Total Expense",
      amount: total.expense,
      type: "expense",
      color: "bg-red-500",
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {quickInfo.map((box, idx) => {
        return (
          <QuickInfoBox
            key={idx}
            logo={box.logo}
            title={box.title}
            amount={box.amount}
            type={box.type}
            color={box.color}
          />
        )
      })}
    </div>
  )
}
