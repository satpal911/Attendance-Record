const mongoose = require ("mongoose")

const principalSchema = new mongoose.Schema({
    schoolName:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Principal",principalSchema)