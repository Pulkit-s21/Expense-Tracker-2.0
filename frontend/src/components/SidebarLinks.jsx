export const SidebarLinks = ({ action, logo, title }) => {
  return (
    <li onClick={action} className="flex gap-4 cursor-pointer">
      <img src={logo} alt="Icon" />
      <p>{title}</p>
    </li>
  )
}
