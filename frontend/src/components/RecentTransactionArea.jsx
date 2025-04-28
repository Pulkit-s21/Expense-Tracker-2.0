import { RecentTransaction } from "./RecentTransaction"

export const RecentTransactionArea = () => {
  const transactions = [
    {
      logo: "",
      title: "Shopping",
      date: "27 Apr, 2025",
      amount: 1320,
      type: "transaction",
    },
    {
      logo: "",
      title: "EMI",
      date: "30 Apr, 2025",
      amount: 4350,
      type: "transaction",
    },
    {
      logo: "",
      title: "Recharge",
      date: "15 May, 2025",
      amount: 260,
      type: "transaction",
    },
  ]

  return (
    <div className="flex flex-col bg-white p-4 w-[40%] gap-3">
      <div className="flex justify-between">
        <p>Recent Transactions</p>
        <button className="bg-gray-200 px-4 rounded-md text-xs cursor-pointer">
          See All
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {transactions.map((transaction, idx) => {
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
