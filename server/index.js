const express = require("express")
require("dotenv").config()
const connectDb = require("./database/db")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const studentRouter = require("./routes/student.router")
const inchargeRouter = require("./routes/incharge.router")
const principalRouter = require("./routes/principal.router")
const attendanceRouter = require("./routes/attendance.router")
const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/v1/student",studentRouter)
app.use("/api/v1/incharge",inchargeRouter)
app.use("/api/v1/principal",principalRouter)
app.use("/api/v1/attendance",attendanceRouter)
connectDb()
.then(()=>{
    app.listen(port,()=>{
        console.log(`server listening on port ${port}`)
    })
})
.catch((error)=>{
    console.log(`server error ${error}`)
})