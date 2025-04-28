import moment from "moment"

export const RecentTransaction = ({ logo, title, date, amount }) => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-4">
        <img src={logo} alt="Icon" />
        <div className="flex flex-col">
          <p className="font-light text-lg">{title}</p>
          <p className="font-extralight text-xs text-gray-400">
            {moment(date).format("Do MMM, YYYY")}
          </p>
        </div>
      </div>
      <div className={`bg-red-100 h-fit px-2 rounded-md`}>
        <p className={`text-red-500`}>
          <span>-$ {amount}</span>
        </p>
      </div>
    </div>
  )
}
