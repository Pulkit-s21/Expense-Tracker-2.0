// import "./App.css"
import Navbar from "./components/Navbar"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"
import { Home } from "./pages/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoutes element={<Home />} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
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
// TODO: Figure out how to show % for each column
// TODO: If token changes then kick out user for invalid token
// : Add all other services for transaction : DONE
// : Add all other services for income : DONE
// : Pass limit to recent transactions to show only few at first : DONE
// : Return transactions in descending order from BE : DONE
