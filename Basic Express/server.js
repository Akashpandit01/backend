const express=require("express")

const app=express();

app.use(express.json());

  app.get("/home",(req,res)=>{

    res.send("<h1>Welcome to Home Page</h1>")
  })

  app.get("/aboutus",(req,res)=>{
    res.json({"message": "Welcome to About Us"})
  })


  app.get("/contactus",(req,res)=>{
   let contact={"abc":"8787878"};
    res.json({"contact":contact})
  })



  app.use((req,res)=>{
    res.json({error:"404 not found"})
  })

app.listen(3000,()=>{
    console.log("server is started")
})