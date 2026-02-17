const express=require("express")
const fs=require("fs")

const app=express();
 
app.use(express.json);


app.use((req,res)=>{
    res.status(404).json({"error":" 404 Not Found"})
})