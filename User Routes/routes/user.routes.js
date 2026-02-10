const express=require("express");
const userRouter=express.Router();

const fs=require("fs");

userRouter.get("/get",(req,res)=>{
    // const data=JSON.parse(fs.readFileSync("./data.json","utf-8"))
    // console.log(data)
//    res.json({ msg: "list of user", data });

const user={
     "id": 1,
     "name": "John Doe",
      "email": "john@example.com"
     }
 res.json({"users":user})

})


userRouter.get("/list",(req,res)=>{
    // const data=JSON.parse(fs.readFileSync("./data.json","utf-8"))

    // res.json({msg:"list of user",users:data.user})

    const users=[
        [
  { "id": 1, "name": "John Doe", "email": "john@example.com" },
  { "id": 2, "name": "Jane Doe", "email": "jane@example.com" },
  { "id": 3, "name": "Bob Smith", "email": "bob@example.com" }
]

    ]
    res.json({msg:"list of users",users})

})

module.exports=userRouter;