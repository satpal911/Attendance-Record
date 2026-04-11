const mongoose = require ("mongoose")

const inchargeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    className:{
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

module.exports = mongoose.model("Incharge",inchargeSchema)