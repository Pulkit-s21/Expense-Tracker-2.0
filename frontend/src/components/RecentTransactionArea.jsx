import { useContext, useEffect, useState } from "react"
import { getTransactions } from "../services/transactionServices"
import { RecentTransaction } from "./RecentTransaction"
import { UserContext } from "../helpers/UserContext"

export const RecentTransactionArea = () => {
  const { user } = useContext(UserContext)
  const [transactionData, setTransactionData] = useState([])
  const limit = 10

  const token = localStorage.getItem("token")

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions(user.id, token, limit)
      setTransactionData(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="flex flex-col bg-white p-4 w-[40%] gap-3">
      <div className="flex justify-between">
        <p>Recent Transactions</p>
        <button className="bg-gray-200 px-4 rounded-md text-xs cursor-pointer">
          See All
        </button>
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
            />
          )
        })}
      </ul>
    </div>
  )
}
