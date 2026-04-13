const mongoose = require('mongoose')
const Attendance = require('../models/attendance.model')
const Student = require('../models/student.model')
const attendanceMark = async (req, res) => {
  try {
    const { studentId, status } = req.body
    const student = await Student.findById(studentId).select("-password")
    if (!student) {
      return res.status(400).json({ message: "Please enter a valid studentId" });
    }
    const dateString = new Date().toISOString().split('T')[0]

    const newRecord = new Attendance({
      studentId,
      status,
      dateString
    })
    await newRecord.save()

    const countPresent = await Attendance.countDocuments({
      studentId,
      status: 'present'
    })

    const countAbsent = await Attendance.countDocuments({
      studentId,
      status: 'absent'
    })

    const countTotal = countPresent + countAbsent

    return res.status(201).json({
      message: `Student is ${status}`,
      stats: {
        present: countPresent,
        absent: countAbsent,
        total: countTotal
      }
    })
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        status: 0,
        message: "Attendance already marked for today!"
      });
    }
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

module.exports = attendanceMark
