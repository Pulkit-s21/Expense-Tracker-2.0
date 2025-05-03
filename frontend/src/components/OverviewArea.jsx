export const OverviewArea = ({ component, heading }) => {
  return (
    <div className="flex flex-col gap-4 bg-white w-[60%] p-4">
      <p className="font-thin">{heading}</p>

      {component}
    </div>
  )
}
