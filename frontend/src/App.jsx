// import "./App.css"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"
import { Home } from "./pages/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Expense } from "./pages/Expense.jsx"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoutes element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </Router>
  )
}

export default App

// : Get site up and running : DONE
// TODO: Find a way to show good errors from backend
// : Make protected routes : DONE
// TODO: Start designing Homepage
// : Create tables from transaction and income : DONE
// : Create transaction APIs : DONE
// : Create income APIs : DONE
// : Create Postman collection for all APIs : DONE
// : Create services from transaction & income APIs : DONE
// : Show actual data from QuickInfoBox from BE : DONE
// TODO: Find a way to reload func when transaction OR income is added
// : Figure out how to show % for each column : DONE
// TODO: If token changes then kick out user for invalid token
// : Add all other services for transaction : DONE
// : Add all other services for income : DONE
// : Pass limit to recent transactions to show only few at first : DONE
// : Return transactions in descending order from BE : DONE
// : Add diff pages for sidebar links : DONE
// TODO: Showing sidebar on each page by importing on all. Try a diff method where it doesnt reloads and part on right does
// : Change recent transaction to get income + transaction for user : DONE
// TODO: Add recent expense to get transaction for user
// : Pass transaction data to bar chart : DONE
// : Customize bar chart : DONE
// : Make bar chart reusable : DONE
// TODO: Pass data for specified days only to bar charts
