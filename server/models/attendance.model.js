const mongoose = require('mongoose')
const Student = require('./student.model')

const attendanceSchema = new mongoose.Schema(
  {
    status:{
        type: String,
        enum:["present","absent"],
        default: "present"
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Attendance",attendanceSchema)
