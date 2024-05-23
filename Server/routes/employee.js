const { Router } = require("express");
const { employeeModel } = require("../models/employee");
const employeerouter = Router();

employeerouter.post('/add', async (req, res) => {
  try {
    const result = await employeeModel.create(req.body);
    return res.status(200).json({ msg: result });
  } catch (err) {
    console.log(err)
  }
})

employeerouter.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updateData = req.body;
    const result = await employeeModel.updateOne({ _id: id }, { $set: updateData });
    console.log(result)
    if (result) {
      return res.status(200).json({ msg: "Employee updated successfully" });
    }
    return res.status(404).json({ msg: "Employee not found or no changes made" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Server error" });
  }
});

employeerouter.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await employeeModel.deleteOne({ _id: id });
    if (result.deletedCount > 0) {
      return res.status(200).json({ msg: "deleted data" });
    }
    return res.status(404).json({ msg: "Something went wrong" });
  } catch (err) {
    console.log(err);
  }
})

module.exports = {employeerouter};