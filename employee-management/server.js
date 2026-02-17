const express=require("express")
const fs=require("fs");
const employeeRouter=require("./routes/employee.routes")

const app=express();

 
app.use(express.json());



app.use("/employee",employeeRouter);

// app.use((req,res)=>{
//     res.status(404).json({"error":" 404 Not Found"})z



app.listen(3000,()=>{
    console.log("server started")
})