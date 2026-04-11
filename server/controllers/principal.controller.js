const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Principal = require('../models/principal.model')
const Incharge = require('../models/incharge.model')
const registerPrincipal = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existPrincipal = await Principal.findOne({ email: emailLower })
    if (existPrincipal) {
      return res.status(401).json({ message: 'principal already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newPrincipal = await Principal.create({
      name,
      email: emailLower,
      password: hashedPassword
    })

    const principalData = newPrincipal.toObject()
    delete principalData.password

    res.status(201).json({
      status: 1,
      message: 'Principal registered successfully',
      data: principalData
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const loginPrincipal = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existPrincipal = await Principal.findOne({ email: emailLower })
    if (!existPrincipal) {
      return res.status(400).json({ message: 'Principal not registered' })
    }

    const isMatch = await bcrypt.compare(password, existPrincipal.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ar password is incorrect' })
    }

    const token = jwt.sign(
      { id: existPrincipal._id, role: 'principal' },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.cookie('token', token, {
      httpOnly: true
    })

    const principalData = existPrincipal.toObject()
    delete principalData.password
    res.status(200).json({
      status: 1,
      message: 'Principal loggedIn successfully',
      data: principalData,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const registerIncharge = async (req, res) => {
  try {
    const { name, className, email, password } = req.body

    if (!name || !className || !email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existIncharge = await Incharge.findOne({ email: emailLower })
    if (existIncharge) {
      return res.status(400).json({ message: 'Incharge already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newIncharge = await Incharge.create({
      name,
      className,
      email: emailLower,
      password: hashedPassword
    })

    const inchargeData = newIncharge.toObject()
    delete inchargeData.password
    res.status(201).json({
      status: 1,
      message: 'Incharge registered successfully',
      data: inchargeData
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

module.exports = { registerIncharge, registerPrincipal, loginPrincipal }
