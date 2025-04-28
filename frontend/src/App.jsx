// import "./App.css"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home } from "./pages/Home.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import ProtectedRoutes from "./components/ProtectedRoutes.jsx"

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
