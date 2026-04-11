const express = require ("express")
const { registerIncharge } = require("../controllers/principal.controller")
const { loginIncharge } = require("../controllers/incharge.controller")
const inchargeAuthentication = require("../middlewares/auth.incharge")
const principalAuthentication = require("../middlewares/auth.principal")

const inchargeRouter = express.Router()

inchargeRouter.post("/registerIncharge",principalAuthentication,registerIncharge)
inchargeRouter.post("/loginIncharge", loginIncharge)


module.exports = inchargeRouter