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
      return res.status(401).json({ message: 'student already registered with this email' })
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

const getAllStudents = async(req,res) =>{
  try {
    const {className} = req.query
    const filter = className ? {className} : {};

    const students = await Student.find(filter).select("-password");

    res.status(200).json({
      status: 1,
      message: "All students fetched successfully",
      count: students.length,
      data: students
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const getOneStudent = async(req,res) =>{
  try {
    const {studentId} = req.query
    const student = await Student.findById(studentId).select("-password")

    res.status(200).json({
      status: 1,
      message: "student fetched successfully",
      data: student
    })

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const updateStudent = async(req,res) =>{
  try {
     const {studentId} = req.query
    const student = await Student.findByIdAndUpdate(studentId,req.body,{new:true}).select("-password")

    res.status(200).json({
      status: 1,
      message: "student updated successfully",
      data: student
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const removeStudent = async(req,res) =>{
  try {
     const {studentId} = req.query
    const student = await Student.findByIdAndDelete(studentId).select("-password")

    res.status(200).json({
      status: 1,
      message: "student removed successfully",
      data: student
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

module.exports = { loginIncharge, registerStudent, getAllStudents, getOneStudent, updateStudent, removeStudent }
