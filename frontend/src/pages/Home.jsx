import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import { PieChart } from "@mui/x-charts/PieChart"

export const Home = () => {
  const { user, logout } = useContext(UserContext)

  return (
    <div className="bg-gray-200 h-dvh text-black font-semibold flex gap-6">
      {/* user info */}
      <div className="flex flex-col items-center p-4 gap-8 bg-white w-[20%]">
        <div className="flex flex-col gap-2">
          <img
            src=""
            alt="User profile"
            className="w-12 h-12 rounded-full border-2"
          />
          <p>{user.username}</p>
        </div>

        {/* links */}
        <ul className="flex flex-col gap-2">
          <li className="flex gap-4 cursor-pointer">
            <img src="" alt="Icon" />
            <p>Dashboard</p>
          </li>
          <li className="flex gap-4 cursor-pointer">
            <img src="" alt="Icon" />
            <p>Income</p>
          </li>
          <li className="flex gap-4 cursor-pointer">
            <img src="" alt="Icon" />
            <p>Expense</p>
          </li>
          <li className="flex gap-4 cursor-pointer" onClick={logout}>
            <img src="" alt="Icon" />
            <p>Logout</p>
          </li>
        </ul>
      </div>

      {/* expense details */}
      <div className="flex flex-col w-[80%]">
        {/* quick info */}
        <div className="flex gap-4 mt-4">
          <div className="flex-1 flex items-center bg-white px-6 py-4 rounded-lg gap-6">
            <img src="" alt="Icon" />
            <div className="flex-col items-center text-center">
              <p className="text-sm font-medium text-gray-400">Total Balance</p>
              <p className="text-xl font-semibold">$22,000</p>
            </div>
          </div>
          <div className="flex-1 flex items-center bg-white px-6 py-4 rounded-lg gap-6">
            <img src="" alt="Icon" />
            <div className="flex-col items-center text-center">
              <p className="text-sm font-medium text-gray-400">Total Income</p>
              <p className="text-xl font-semibold">$30,000</p>
            </div>
          </div>
          <div className="flex-1 flex items-center bg-white px-6 py-4 rounded-lg gap-6">
            <img src="" alt="Icon" />
            <div className="flex-col items-center text-center">
              <p className="text-sm font-medium text-gray-400">Total Expense</p>
              <p className="text-xl font-semibold">$8,000</p>
            </div>
          </div>
        </div>

        {/* recent & chart */}
        <div className="flex gap-4 mt-10">
          {/* recent transactions */}
          <div className="flex flex-col bg-white p-4 w-[40%] gap-3">
            <div className="flex justify-between">
              <p>Recent Transactions</p>
              <button className="bg-gray-200 px-4 rounded-md text-xs cursor-pointer">
                See All
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img src="" alt="Icon" />
                  <div className="flex flex-col">
                    <p className="font-light">Shopping</p>
                    <p className="font-extralight text-sm text-gray-400">
                      27 Apr, 2025
                    </p>
                  </div>
                </div>
                <div className="">
                  <p> -$430</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img src="" alt="Icon" />
                  <div className="flex flex-col">
                    <p className="font-light">Shopping</p>
                    <p className="font-extralight text-sm text-gray-400">
                      27 Apr, 2025
                    </p>
                  </div>
                </div>
                <div className="">
                  <p> -$430</p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img src="" alt="Icon" />
                  <div className="flex flex-col">
                    <p className="font-light">Shopping</p>
                    <p className="font-extralight text-sm text-gray-400">
                      27 Apr, 2025
                    </p>
                  </div>
                </div>
                <div className="">
                  <p> -$430</p>
                </div>
              </div>
            </ul>
          </div>

          {/* chart */}
          <div className="flex flex-col gap-4 bg-white w-[60%] p-4">
            <p>Financial Overview</p>
            <PieChart
              series={[
                {
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  //   arcLabel: (item) => `${item.value}%`, // TODO: Figure out how to show % for each column
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
