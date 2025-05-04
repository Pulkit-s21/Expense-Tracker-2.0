import { useContext } from "react"
import { UserContext } from "../helpers/UserContext"
import { SidebarLinks } from "./SidebarLinks"
import { useNavigate } from "react-router-dom"
import { LuLayoutDashboard } from "react-icons/lu"
import { IoWalletOutline } from "react-icons/io5"
import { GiTakeMyMoney } from "react-icons/gi"
import { IoLogOutOutline } from "react-icons/io5"

export const UserInfo = () => {
  const { user, logout } = useContext(UserContext)
  const navigate = useNavigate()

  const sidebarLinks = [
    {
      logo: <LuLayoutDashboard />,
      title: "Dashboard",
      action: () => navigate("/"),
    },
    {
      logo: <IoWalletOutline />,
      title: "Income",
      action: () => navigate("/income"),
    },
    {
      logo: <GiTakeMyMoney />,
      title: "Expense",
      action: () => navigate("/expense"),
    },
    { logo: <IoLogOutOutline />, title: "Logout", action: logout },
  ]

  return (
    <div className="flex flex-col items-center p-4 gap-8 bg-white w-[15%]">
      <div className="flex flex-col gap-2">
        {/* <img
          src={user?.image}
          alt="User profile"
          className="w-12 h-12 rounded-full border-2"
        /> */}
        <p>{user?.username}</p>
      </div>

      {/* links */}
      <ul className="flex flex-col gap-3">
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
