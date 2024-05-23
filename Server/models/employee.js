const {mongoose, Schema} = require("mongoose");

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: "",
        },
        email: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        position: {
            type: String,
            default: "",
        },
        qualification: {
            type: String,
            default: "",
        },
        
    },
    { timestamps: true }
);

const employeeModel = mongoose.model("employee", employeeSchema);

module.exports = { employeeModel };