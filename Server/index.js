const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require("mongoose");
const { employeeModel } = require("./models/employee");
const PORT = 8000;
const app = express();
const { router } = require("./routes/user");
const { employeerouter } = require("./routes/employee");

//connect database
mongoose.connect("mongodb://localhost:27017/Rise11")
.then(() => {
    console.log("Database Connection Successfull");
}).catch((err) => {
    console.log("Not Able to Connect ", err);
});


//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const alldata = await employeeModel.find({});
    return res.status(201).json({ msg: alldata });
});
 
app.use("/user", router);
app.use("/employee", employeerouter);

app.listen(PORT, () => {
    console.log("Server Start on Port 8000");
});