export const QuickInfoBox = ({ logo, title, amount, type }) => {
  return (
    <div className="flex-1 flex items-center bg-white px-6 py-4 rounded-lg gap-6">
      {/* <img src={logo} alt="Icon" /> */}
      <div className="flex-col items-center text-center">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="lg:text-2xl text-gray-300">
          ${" "}
          <span
            className={`lg:text-2xl font-bold ${
              type === "transaction"
                ? "text-red-500"
                : type === "income"
                ? "text-green-500"
                : "text-blue-500"
            }`}
          >
            {amount}
          </span>
        </p>
      </div>
    </div>
  )
}
