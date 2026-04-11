const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const Student = require('../models/student.model')

const loginStudent = async (req, res) => {
  const { name, email, rollNo, password, className } = req.body
  try {
    if (!name || !email || !rollNo || !password || !className) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existStudent = await Student.findOne({ email: emailLower })
    if (!existStudent) {
      return res.status(400).json({ message: 'Student not registered' })
    }

    const isMatch = await bcrypt.compare(password, existStudent.password)
    if (!isMatch) {
      return res.status(403).json({ message: 'email or password is incorrect' })
    }

    const token = jwt.sign(
      {
        id: existStudent._id,
        role: 'student'
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    )

    res.cookie("token",token,{httpOnly:true})

    const studentData = existStudent.toObject()
    delete studentData.password
    
    res.status(200).json({
      status: 1,
      message: 'Student loggedIn successfully',
      data: studentData,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

// const registerStudent = async(req,res) =>{
//     const {name, email, rollNo, password, className} = req.body
//     try {
//       if(!name || !email || !rollNo || !password || !className){
//             return res.status(400).json({
//         status:0,
//     message: "All fields are required"}
//         )}
//          const emailLower = email.trim().toLowerCase()
//          const existStudent = await Student.findOne({email: emailLower})
//          if(existStudent){
//             return res.status(400).json({message: "Student already registered"})
//          }

//          const newStudent = await Student.create({
//                 name,
//                 email: emailLower,
//                 password: hashedPassword
//          })
//          const hashedPassword = await bcrypt.hash(password,10)
//         res.status(201).json({
//             status: 1,
//             message: "Student registered successfully",
//             data: res.data
//         })
//     } catch (error) {
//         res.status(500).json({
//             status: 0,
//             message: `server error ${error}`
//         })
//     }
// }

module.exports = { loginStudent }
