const express = require ("express")
const { registerIncharge } = require("../controllers/principal.controller")
const { loginIncharge, getAllStudents, getOneStudent, updateStudent, removeStudent } = require("../controllers/incharge.controller")
const inchargeAuthentication = require("../middlewares/auth.incharge")
const principalAuthentication = require("../middlewares/auth.principal")

const inchargeRouter = express.Router()

inchargeRouter.post("/registerIncharge",principalAuthentication,registerIncharge)
inchargeRouter.post("/loginIncharge", loginIncharge)

inchargeRouter.get("/getAllStudents",getAllStudents)
inchargeRouter.get("/getOneStudent", getOneStudent)

inchargeRouter.patch("/updateStudent",updateStudent)

inchargeRouter.delete("/removeStudent",removeStudent)

module.exports = inchargeRouter