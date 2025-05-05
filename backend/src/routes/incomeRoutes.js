import { Router } from "express"
import { incomeValidation } from "../validator/validations.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

// create
router.post("/create", async (req, res) => {
  try {
    const { error, value } = incomeValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { title, userId, date, amount } = value

    if (req.userId !== userId) {
      return res.status(400).json({ message: "Forbidden. Access Denied !!" })
    }

    const income = await prisma.income.create({
      data: {
        title,
        userId,
        date,
        amount,
      },
    })

    if (!income || !income.id) {
      return res.status(400).json({ message: "Failed to add income !!" })
    }

    res.json({ message: "Income added !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// read
router.get("/read/:userId", async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : undefined
    const { userId } = req.params

    if (req.userId !== parseInt(userId)) {
      return res.status(400).json({ message: "Forbidden. Access Denied !!" })
    }

    const allIncomes = await prisma.income.findMany({
      where: { userId: parseInt(userId) },
      orderBy: { createdAt: "desc" },
      take: limit || undefined,
    })

    if (!allIncomes)
      return res.status(404).json({ message: "No income found for user !!" })

    res.json(allIncomes)
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// update
router.put("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { title, userId, date, amount } = req.body

    if (req.userId !== userId) {
      return res.status(400).json({ message: "Forbidden. Access Denied !!" })
    }

    const income = await prisma.income.findUnique({
      where: { id: parseInt(id) },
    })

    if (!income)
      return res
        .status(404)
        .json({ message: "No income found with this id !!" })

    await prisma.income.update({
      where: { id: parseInt(id) },
      data: { title, date, amount },
    })

    res.json({ message: "Income updated" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// delete
router.put("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params

    const income = await prisma.income.findUnique({
      where: { id: parseInt(id) },
    })

    if (!income) return res.status(404).json({ message: "No income found !!" })

    if (income?.isDeleted === true) {
      return res
        .status(400)
        .json({ message: "Income has already been deleted !!" })
    }

    await prisma.income.update({
      where: { id: parseInt(id) },
      data: { isDeleted: true },
    })

    res.json({ message: "Income Deleted !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

export default router
