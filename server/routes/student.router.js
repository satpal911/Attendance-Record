const express = require ("express")
const { registerStudent } = require("../controllers/incharge.controller")
const { loginStudent } = require("../controllers/student.controller")
const studentAuthentication = require("../middlewares/auth.student")
const inchargeAuthentication = require("../middlewares/auth.incharge")

const studentRouter = express.Router()

studentRouter.post("/registerStudent",inchargeAuthentication,registerStudent)
studentRouter.post("/loginStudent", loginStudent)


module.exports = studentRouter