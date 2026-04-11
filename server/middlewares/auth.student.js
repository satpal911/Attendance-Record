const jwt = require('jsonwebtoken')
const Student = require('../models/student.model')

const studentAuthentication = async (req, res, next) => {
  try {
    let token = null
    if (req.cookies?.token) {
      token = req.cookies.token
    } else if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split('')[0]
    }
    if (!token) {
      return res.status(400).json({ message: 'User not found, please login' })
    }

    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      res.status(500).json({
        status: 0,
        message: 'Middleware authentication error'
      })
    }

    const student = await Student.findById(decoded.id).select('-password')
    if (!student) {
      return res.status(401).json({
        status: 0,
        message: 'User not found. Please log in again.'
      })
    }
    req.student = student
    next()
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: 'Middleware authentication error'
    })
  }
}

module.exports = studentAuthentication
