const mongoose = require('mongoose')
const Attendance = require('../models/attendance.model')
const attendanceMark = async (req, res) => {
  try {
    const { studentId, status } = req.body

    const newRecord = new Attendance({
      studentId,
      status
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
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}
