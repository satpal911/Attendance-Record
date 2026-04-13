const express = require ("express")
const { loginPrincipal, registerPrincipal, getAllIncharges, getOneIncharge, updateIncharge, removeIncharge, getAllPrincipals, getOnePrincipal, updatePrincipal, removePrincipal } = require("../controllers/principal.controller")
const principalAuthentication = require("../middlewares/auth.principal")

const principalRouter = express.Router()

principalRouter.post("/registerPrincipal",registerPrincipal)
principalRouter.post("/loginPrincipal",loginPrincipal)

principalRouter.get("/getAllIncharges",getAllIncharges)
principalRouter.get("/getOneIncharge", getOneIncharge)

principalRouter.patch("/updateIncharge",updateIncharge)

principalRouter.delete("/removeIncharge",removeIncharge)

principalRouter.get("/getAllPrincipals",getAllPrincipals)
principalRouter.get("/getOnePrincipal", getOnePrincipal)

principalRouter.patch("/updatePrincipal",updatePrincipal)

principalRouter.delete("/removePrincipal",removePrincipal)


module.exports =  principalRouter