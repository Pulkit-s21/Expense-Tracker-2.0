import jwt from "jsonwebtoken"

function middleware(req, res, next) {
  const token = req.headers["authorization"]

  if (!token) return res.status(404).json({ message: "Token not provided !!" })

  jwt.verify(token, process.env.jwt_secret_key, (err, decoded) => {
    if (err)
      return res.status(400).json({ message: "Invalid token provided !!" })

    req.userId = decoded.id

    next()
  })
}

export default middleware
