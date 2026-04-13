const express = require("express")
const attendanceMark = require("../controllers/attendance.controller")
const inchargeAuthentication = require("../middlewares/auth.incharge")

const attendanceRouter = express.Router()

attendanceRouter.post("/attendanceMark",inchargeAuthentication,attendanceMark)

module.exports = attendanceRouter