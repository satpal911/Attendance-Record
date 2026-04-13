const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Principal = require('../models/principal.model')
const Incharge = require('../models/incharge.model')
const registerPrincipal = async (req, res) => {
  try {
    const { schoolName, name, email, password } = req.body

    if (!schoolName || !name || !email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existPrincipal = await Principal.findOne({ email: emailLower })
    if (existPrincipal) {
      return res.status(401).json({ message: 'principal already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newPrincipal = await Principal.create({
      schoolName,
      name,
      email: emailLower,
      password: hashedPassword
    })

    const principalData = newPrincipal.toObject()
    delete principalData.password

    res.status(201).json({
      status: 1,
      message: 'Principal registered successfully',
      data: principalData
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const loginPrincipal = async (req, res) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existPrincipal = await Principal.findOne({ email: emailLower })
    if (!existPrincipal) {
      return res.status(400).json({ message: 'Principal not registered' })
    }

    const isMatch = await bcrypt.compare(password, existPrincipal.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Email ar password is incorrect' })
    }

    const token = jwt.sign(
      { id: existPrincipal._id, role: 'principal' },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d'
      }
    )

    res.cookie('token', token, {
      httpOnly: true
    })

    const principalData = existPrincipal.toObject()
    delete principalData.password
    res.status(200).json({
      status: 1,
      message: 'Principal loggedIn successfully',
      data: principalData,
      token
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const registerIncharge = async (req, res) => {
  try {
    const { name, className, email, password } = req.body

    if (!name || !className || !email || !password) {
      return res.status(400).json({
        status: 0,
        message: 'All fields are required'
      })
    }

    const emailLower = email.trim().toLowerCase()
    const existIncharge = await Incharge.findOne({ email: emailLower })
    if (existIncharge) {
      return res.status(400).json({ message: 'Incharge already registered' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newIncharge = await Incharge.create({
      name,
      className,
      email: emailLower,
      password: hashedPassword
    })

    const inchargeData = newIncharge.toObject()
    delete inchargeData.password
    res.status(201).json({
      status: 1,
      message: 'Incharge registered successfully',
      data: inchargeData
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}


const getAllIncharges = async(req,res) =>{
  try {
    const {className} = req.query
    const filter = className ? {className} : {};

    const incharges = await Incharge.find(filter).select("-password");

    res.status(200).json({
      status: 1,
      message: "All Incharges fetched successfully",
      count: incharges.length,
      data: incharges
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const getOneIncharge = async(req,res) =>{
  try {
    const {inchargeId} = req.query
    const incharge = await Incharge.findById(inchargeId).select("-password")

    res.status(200).json({
      status: 1,
      message: "incharge fetched successfully",
      data: incharge
    })

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const updateIncharge = async(req,res) =>{
  try {
     const {inchargeId} = req.query
    const incharge = await Incharge.findByIdAndUpdate(inchargeId,req.body,{ returnDocument: 'after' }).select("-password")

    res.status(200).json({
      status: 1,
      message: "incharge updated successfully",
      data: incharge
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const removeIncharge = async(req,res) =>{
  try {
     const {inchargeId} = req.query
    const incharge = await Incharge.findByIdAndDelete(inchargeId).select("-password")

    res.status(200).json({
      status: 1,
      message: "incharge removed successfully",
      data: incharge
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}


const getAllPrincipals = async(req,res) =>{
  try {
    const {schoolName} = req.query
    const filter = schoolName ? {schoolName} : {};

    const principals = await Principal.find(filter).select("-password");

    res.status(200).json({
      status: 1,
      message: "All principals fetched successfully",
      count: principals.length,
      data: principals
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const getOnePrincipal = async(req,res) =>{
  try {
    const {schoolName, principalId} = req.query
    const principal = await Principal.findById(principalId).select("-password")

    res.status(200).json({
      status: 1,
      message: "principal fetched successfully",
      data: principal
    })

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const updatePrincipal = async(req,res) =>{
  try {
     const {principalId} = req.query
    const principal = await Principal.findByIdAndUpdate(principalId,req.body,{ returnDocument: 'after' }).select("-password")

    res.status(200).json({
      status: 1,
      message: "principal updated successfully",
      data: principal
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}

const removePrincipal = async(req,res) =>{
  try {
     const {principalId} = req.query
    const principal = await Principal.findByIdAndDelete(principalId).select("-password")

    res.status(200).json({
      status: 1,
      message: "principal removed successfully",
      data: principal
    })
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: `server error ${error}`
    })
  }
}


module.exports = { registerIncharge, registerPrincipal, loginPrincipal, getAllIncharges, getOneIncharge, updateIncharge, removeIncharge, getAllPrincipals, getOnePrincipal, updatePrincipal, removePrincipal }
