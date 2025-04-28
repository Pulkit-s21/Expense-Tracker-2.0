import { Router } from "express"
import { transactionValidation } from "../validator/validations.js"
import { validationError } from "../validator/error.js"
import prisma from "../prismaClient.js"

const router = Router()

// create
router.post("/create", async (req, res) => {
  try {
    const { error, value } = transactionValidation.validate(req.body)

    if (error) {
      return validationError(res, error)
    }

    const { title, userId, date, amount } = value

    if (req.userId !== userId) {
      return res.status(400).json({ message: "Forbidden. Access Denied !!" })
    }

    const transaction = await prisma.transaction.create({
      data: {
        title,
        userId,
        date,
        amount,
      },
    })

    console.log(transaction)

    if (!transaction || !transaction.id) {
      return res
        .status(400)
        .json({ message: "Failed to create a transaction !!" })
    }

    res.json({ message: "Transaction added !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// read
router.get("/read/:userId", async (req, res) => {
  try {
    const { userId } = req.params

    if (req.userId !== parseInt(userId)) {
      return res.status(400).json({ message: "Forbidden. Access Denied !!" })
    }

    const allTransactions = await prisma.transaction.findMany({
      where: { userId: parseInt(userId) },
    })

    if (!allTransactions)
      return res
        .status(404)
        .json({ message: "No transaction found for user !!" })

    res.json(allTransactions)
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

    const transaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: { title, date, amount },
    })

    if (!transaction)
      return res
        .status(404)
        .json({ message: "No transaction found with this id !!" })

    res.json({ message: "Transaction updated" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

// delete
router.put("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params

    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    })

    if (!transaction) {
      return res.status(404).json({ message: "No transaction found !!" })
    }

    if (transaction && transaction.isDeleted === true) {
      return res
        .status(400)
        .json({ message: "Transaction is already deleted !!" })
    }

    await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: {
        isDeleted: true,
      },
    })

    // if (!transaction)
    //   return res.status(404).json({ message: "No transaction found !!" })

    res.json({ message: "Transaction Deleted !!" })
  } catch (err) {
    console.error(err.message)
    return res.status(503).json({ message: err.message })
  }
})

export default router
