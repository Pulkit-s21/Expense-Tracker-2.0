import moment from "moment"
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6"

export const RecentTransaction = ({ logo, title, date, amount, type }) => {
  return (
    <div className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 rounded-md">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Icon" />
        <div className="flex flex-col">
          <p className="font-light text-lg">{title}</p>
          <p className="font-extralight text-xs text-gray-400">
            {moment(date).format("Do MMM, YYYY")}
          </p>
        </div>
      </div>
      <div
        className={`${
          type === "expense" ? "bg-red-100" : "bg-green-200"
        }  h-fit px-2 rounded-sm`}
      >
        <p
          className={`${
            type === "expense" ? "text-red-500" : "text-green-500"
          } flex items-center gap-2`}
        >
          <span className="font-light">
            {type === "expense" ? "-" : "+"} $ {amount}
          </span>

          <span>
            {type === "expense" ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
          </span>
        </p>
      </div>
    </div>
  )
}
