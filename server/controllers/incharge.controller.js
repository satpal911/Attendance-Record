const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Incharge = require('../models/incharge.model')
const Student = require('../models/student.model')
const bcrypt = require("bcrypt")
const loginIncharge = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existIncharge = await Incharge.findOne({ email: emailLower })
    if (!existIncharge) {
      return res.status(400).json({ message: 'Incharge not registered' })
    }

    const isMatch = await bcrypt.compare(password,existIncharge.password)
    if(!isMatch){
      return res.status(401).json({message: "email or password is incorrect"})
    }

    const token = jwt.sign(
      { id: existIncharge._id, role: 'incharge' },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.cookie("token",token,{httpOnly: true})

    const inchargeData = existIncharge.toObject();
    delete inchargeData.password
    res.status(200).json({
      status: 1,
      message: 'Incharge loggedIn successfully',
      data: inchargeData,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const registerStudent = async (req, res) => {
  try {
    const { name, email, password, rollNo, className } = req.body

    if (!name || !email || !password || !rollNo || !className) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existStudent = await Student.findOne({ email: emailLower })
    if (existStudent) {
      return res.status(401).json({ message: 'student already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newStudent = await Student.create({
      name,
      email: emailLower,
      rollNo,
      className,
      password: hashedPassword
    })

    const studentData = newStudent.toObject();
    delete studentData.password

    res.status(201).json({
      status: 1,
      message: 'Student registered successfully',
      data: studentData
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

module.exports = { loginIncharge, registerStudent }
