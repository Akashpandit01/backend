const express=require("express");
const fs=require("fs");
const userRouter = require("./routes/user.routes");

const app=express();
app.use(express.json());
  



app.use("/users",userRouter)

app.use((req,res)=>{
    res.status(404).json({error:"404 Not found"})
})




app.listen(3000,()=>{
    console.log("server is started")
})