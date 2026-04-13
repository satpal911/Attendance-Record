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
    },
     dateString: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
)

attendanceSchema.index({studentId: 1, dateString: 1},{unique: true})

module.exports = mongoose.model("Attendance",attendanceSchema)
