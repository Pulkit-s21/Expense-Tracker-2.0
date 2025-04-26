import express, { json } from "express"
import dotenv from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
// import middleware from "./middleware/middleware.js"

dotenv.config()

const PORT = process.env.PORT || 2000

const app = express()

// middleware
app.use(json())

// cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET, POST, PUT, DELETE"],
  })
)

// routes
app.use("/auth", authRoutes)

app.listen(PORT, (req, res) => {
  console.info(`Server running on port ${PORT}`)
})
