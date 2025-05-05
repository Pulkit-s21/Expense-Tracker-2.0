export const QuickInfoBox = ({ logo, title, amount, color }) => {
  return (
    <div className="flex-1 flex items-center bg-white px-6 py-4 rounded-lg gap-4 shadow-xl">
      <span className={`text-4xl rounded-full ${color} p-4`}>{logo}</span>
      <div className="flex-col items-center text-center">
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="lg:text-2xl text-gray-900">
          ${" "}
          <span className={`lg:text-2xl font-medium text-gray-900`}>
            {amount}
          </span>
        </p>
      </div>
    </div>
  )
}
