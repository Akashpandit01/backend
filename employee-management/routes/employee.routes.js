
const express=require("express");
const  employeeRouter=express.Router();

const fs=require("fs");
const { getData, addorUpdateData } = require("../models/employee.model");
const { getAllemp, addemployee, updateEmployee, deleteEmployee } = require("../controllers/employee.controller");

employeeRouter.get("/all-employee",getAllemp)
employeeRouter.post("/add-employee",addemployee)


employeeRouter.put("/update-employee/:id",updateEmployee)

employeeRouter.delete("/delete-employee/:id",deleteEmployee)



module.exports=employeeRouter;



