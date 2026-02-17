const express=require("express")
const todoRouter=express.Router();
const fs=require("fs");


todoRouter.post("/add-todos",(req,res)=>{
   
    let newtodo=req.body;

    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"));
    let 

})