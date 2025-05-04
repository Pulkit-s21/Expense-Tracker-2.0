export const SidebarLinks = ({ action, logo, title }) => {
  return (
    <li
      onClick={action}
      className="flex gap-4 cursor-pointer items-center text-xl bg-violet-600 hover:bg-violet-300 transition-all text-white px-6 py-2 rounded-md"
    >
      <span className="text-2xl">{logo}</span>
      <p className="font-medium">{title}</p>
    </li>
  )
}
