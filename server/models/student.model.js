const mongoose = require ("mongoose")
const inchargeSchema = require("./incharge.model")

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    rollNo:{
        type: String,
        required: true,
        unique: true
    },
    className:{
        type: String,
        required: true
    },
    incharge:{
        type: mongoose.Schema.Types.ObjectId,
        Ref: inchargeSchema
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Student", studentSchema)