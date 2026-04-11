const express = require ("express")
const { loginPrincipal, registerPrincipal } = require("../controllers/principal.controller")
const principalAuthentication = require("../middlewares/auth.principal")

const principalRouter = express.Router()

principalRouter.post("/registerPrincipal",registerPrincipal)
principalRouter.post("/loginPrincipal",loginPrincipal)


module.exports =  principalRouter