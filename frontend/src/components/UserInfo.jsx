import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import { SidebarLinks } from "./SidebarLinks"
import { useNavigate } from "react-router-dom"

export const UserInfo = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const sidebarLinks = [
    { logo: "", title: "Dashboard", action: () => navigate("/") },
    { logo: "", title: "Income", action: () => navigate("/income") },
    { logo: "", title: "Expense", action: () => navigate("/expense") },
    { logo: "", title: "Logout", action: logout },
  ]

  return (
    <div className="flex flex-col items-center p-4 gap-8 bg-white w-[20%]">
      <div className="flex flex-col gap-2">
        {/* <img
          src={user?.image}
          alt="User profile"
          className="w-12 h-12 rounded-full border-2"
        /> */}
        <p>{user?.username}</p>
      </div>

      {/* links */}
      <ul className="flex flex-col gap-2">
        {sidebarLinks.map((link, idx) => {
          return (
            <SidebarLinks
              key={idx}
              logo={link.logo}
              title={link.title}
              action={link.action}
            />
          )
        })}
      </ul>
    </div>
  )
}
