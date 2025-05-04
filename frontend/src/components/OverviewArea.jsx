export const OverviewArea = ({ component, heading }) => {
  return (
    <div className="flex flex-col gap-4 bg-white w-[50%] p-4 shadow-xl rounded-xl">
      <p className="font-thin">{heading}</p>

      {component}
    </div>
  )
}
