const express = require ("express")
const { loginPrincipal, registerPrincipal, getAllIncharges, getOneIncharge, updateIncharge, removeIncharge, getAllPrincipals, getOnePrincipal, updatePrincipal, removePrincipal } = require("../controllers/principal.controller")
const principalAuthentication = require("../middlewares/auth.principal")

const principalRouter = express.Router()

principalRouter.post("/registerPrincipal",registerPrincipal)
principalRouter.post("/loginPrincipal",loginPrincipal)

principalRouter.get("/getAllIncharges",principalAuthentication,getAllIncharges)
principalRouter.get("/getOneIncharge", principalAuthentication,getOneIncharge)

principalRouter.patch("/updateIncharge",principalAuthentication,updateIncharge)

principalRouter.delete("/removeIncharge",principalAuthentication,removeIncharge)

principalRouter.get("/getAllPrincipals",principalAuthentication,getAllPrincipals)
principalRouter.get("/getOnePrincipal", principalAuthentication,getOnePrincipal)

principalRouter.patch("/updatePrincipal",principalAuthentication,updatePrincipal)

principalRouter.delete("/removePrincipal",principalAuthentication,removePrincipal)


module.exports =  principalRouter