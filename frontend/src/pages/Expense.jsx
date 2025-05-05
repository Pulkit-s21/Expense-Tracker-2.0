import { useContext, useEffect, useState } from "react"
import { UserInfo } from "../components/UserInfo"
import {
  deleteTransaction,
  getTransactions,
} from "../services/transactionServices"
import { UserContext } from "../helpers/UserContext"
import { Barchart } from "../components/Barchart"
import { FaArrowTrendDown } from "react-icons/fa6"
import { BiTrashAlt } from "react-icons/bi"
import moment from "moment"
import Swal from "sweetalert2"

export const Expense = () => {
  const { user, token } = useContext(UserContext)
  const [transactionData, setTransactionData] = useState([])

  const fetchInfo = async () => {
    try {
      const data = await getTransactions(user.id, token)
      setTransactionData(data)
    } catch (err) {
      console.error(err.message)
    }
  }

  const deleteItem = async (id, token) => {
    try {
      const res = await deleteTransaction(id, token)
      if (res) {
        Swal.fire({
          icon: "success",
          text: "Transaction delted !",
          showConfirmButton: false,
          timer: 2000,
        }).then(() => fetchInfo())
      }
    } catch (err) {
      console.error(err.message)
    }
  }

  useEffect(() => {
    fetchInfo()
  }, [])

  return (
    <div className="bg-gray-50 h-full text-black font-semibold flex gap-6">
      <UserInfo />

      <div className="flex flex-col gap-4 py-6 pr-4 w-full mb-10">
        {/* chart section */}
        <section className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-10">
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-medium tracking-wide">
                Expense Overview
              </p>
              <p className="font-light text-sm text-gray-500">
                Track your spending trend
              </p>
            </div>
            <button className="rounded-md text-purple-600 bg-gray-200 px-6 py-2 font-light">
              + Add Expense
            </button>
          </div>
          <Barchart
            type="expense"
            label="Expense"
            id="expenseId"
            color="teal"
            height="500"
            filter={false}
          />
        </section>

        {/* list section */}
        <section className="grid grid-cols-2 gap-4">
          {transactionData.map((item, idx) => {
            return (
              <div
                key={idx}
                className="flex justify-between items-center hover:bg-gray-100 px-4 py-2 rounded-md group transition-all"
              >
                <div className="flex items-center gap-4">
                  <img src={item.logo} alt="Icon" />
                  <div className="flex flex-col">
                    <p className="font-light text-lg">{item.title}</p>
                    <p className="font-extralight text-xs text-gray-500">
                      {moment(item.date).format("Do MMMM, YY")}
                    </p>
                  </div>
                </div>
                <div className={`flex items-center gap-4`}>
                  <button
                    onClick={() => {
                      console.log(token)
                      deleteItem(item.id, token)
                    }}
                    className={`hidden group-hover:block bg-gray-600 rounded-full p-2 cursor-pointer`}
                  >
                    <BiTrashAlt color="white" />
                  </button>
                  <div>
                    <p
                      className={`text-red-500 bg-red-100 h-fit px-2 rounded-sm flex items-center gap-2`}
                    >
                      <span className="font-light">
                        {"-"} $ {item.amount}
                      </span>

                      <span>
                        <FaArrowTrendDown />
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </section>
      </div>
    </div>
  )
}
