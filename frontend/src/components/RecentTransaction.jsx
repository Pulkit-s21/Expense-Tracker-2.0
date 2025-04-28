export const RecentTransaction = ({ logo, title, date, amount, type }) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img src={logo} alt="Icon" />
        <div className="flex flex-col">
          <p className="font-light">{title}</p>
          <p className="font-extralight text-sm text-gray-400">{date}</p>
        </div>
      </div>
      <div
        className={`${
          type === "transaction" ? "bg-red-100" : "bg-green-100"
        } h-fit px-2 rounded-md`}
      >
        <p
          className={`${
            type === "transaction" ? "text-red-400" : "text-green-400"
          }`}
        >
          <span>
            {type === "transaction" ? <span>-</span> : <span>""</span>}${" "}
            {amount}
          </span>
        </p>
      </div>
    </div>
  )
}
