import { Router } from "express"
import { signUpValidation, loginValidation } from "../validator/validations.js"
import { validationError } from "../validator/error.js"
import bcrypt from "bcryptjs"
import prisma from "../prismaClient.js"
import jwt from "jsonwebtoken"
import middleware from "../middleware/middleware.js"

const router = Router()

// register
router.post("/signUp", async (req, res) => {
  try {
    const { error, value } = signUpValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { username, email, password } = value

    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Please login using email" })
    }

    const hashedPswrd = bcrypt.hashSync(password, 8)

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPswrd,
      },
    })

    if (!user || !user.id) {
      return res.status(400).json({ message: "Failed to created user !!" })
    }

    const token = jwt.sign({ id: user.id }, process.env.jwt_secret_key, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// login
router.post("/login", async (req, res) => {
  try {
    const { error, value } = loginValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { email, password } = value

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user)
      return res
        .status(404)
        .json({ message: "No user found with this email !!" })

    const isPswrdValid = bcrypt.compareSync(password, user.password)

    if (!isPswrdValid)
      return res
        .status(400)
        .json({ message: "Password didn't match. Try again !!" })

    const token = jwt.sign({ id: user.id }, process.env.jwt_secret_key, {
      expiresIn: "24h",
    })

    res.json({ token })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// userDetail
router.get(`/user/:id`, middleware, async (req, res) => {
  try {
    const { id } = req.params

    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
      },
    })

    if (!user) return res.status(404).json({ message: "No user found !!" })

    return res.json(user)
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: "Something went wrong !!" })
  }
})

// all transactions
router.get(`/transactions/:userId`, middleware, async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const { userId } = req.params
    if (req.userId !== parseInt(userId)) {
      return res.status(500).json({ message: "Forbidden. Access Denied" })
    }

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        transaction: { where: { isDeleted: false } },
        income: { where: { isDeleted: false } },
      },
    })

    if (!user) {
      return res.status(404).json({ message: "No user found with this id !!" })
    }

    const combined = [
      ...user.transaction.map((item) => ({
        ...item,
        type: "expense",
      })),
      ...user.income.map((item) => ({ ...item, type: "income" })),
    ]

    const recent = combined
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)

    res.json(recent)
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

export default router
