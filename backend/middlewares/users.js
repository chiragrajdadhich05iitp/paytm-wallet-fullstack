const jwt = require('jsonwebtoken')
const User = require('../models/User')

const JWT_SECRET = process.env.JWT_SECRET || "chirag_jwt_secret_key_123"

/**
 * verifies token from request header, if successful then puts userId into request
 */
module.exports.authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader) {
      return res.status(403).json({ message: "No token provided" })
    }

    // Handles both "Bearer <token>" and raw "<token>"
    const token = authHeader.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : authHeader

    const decoded = jwt.verify(token, JWT_SECRET)
    req.userId = decoded.userId
    next()
  }
  catch (err) {
    return res.status(411).json({ message: "Authentication Failed", error: err.message })
  }
}