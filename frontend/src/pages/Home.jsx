import { UserInfo } from "../components/UserInfo"
import { DetailArea } from "../components/DetailArea"

export const Home = () => {
  return (
    <div className="bg-gray-200 h-full text-black font-semibold flex gap-6">
      <UserInfo />

      <DetailArea />
    </div>
  )
}

export default Home
