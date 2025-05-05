import { useContext, useEffect, useState } from "react"
import { RecentTransaction } from "./RecentTransaction"
import { UserContext } from "../helpers/UserContext"
import { FaLongArrowAltRight } from "react-icons/fa"
import { Link } from "react-router-dom"

export const RecentTransactionArea = ({
  detailFunc,
  limit,
  heading,
  page = "",
}) => {
  const { user, token } = useContext(UserContext)
  const [transactionData, setTransactionData] = useState([])
  const lastMonth = new Date()
  lastMonth.setDate(lastMonth.getDate() - 30)

  const fetchInfo = async () => {
    try {
      const data = await detailFunc(user.id, token, limit)
      setTransactionData(
        data?.filter((item) => new Date(item.date) >= lastMonth) // only showing data for last month
      )
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className="flex flex-col bg-white p-4 w-[50%] gap-5 shadow-xl rounded-xl">
      <div className="flex justify-between">
        <p>{heading}</p>
        <Link
          to={page}
          className="bg-gray-100 hover:bg-violet-100 transition-all px-3 rounded-md text-xs cursor-pointer flex gap-2 items-center font-medium"
        >
          See All <FaLongArrowAltRight />
        </Link>
      </div>

      <ul className="flex flex-col gap-2">
        {transactionData?.map((transaction, idx) => {
          return (
            <RecentTransaction
              key={idx}
              logo={transaction.logo}
              title={transaction.title}
              date={transaction.date}
              amount={transaction.amount}
              type={transaction.type}
            />
          )
        })}
      </ul>
    </div>
  )
}
