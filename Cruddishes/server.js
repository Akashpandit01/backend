
const express=require("express");
 const fs=require("fs");
const { json } = require("stream/consumers");
const app=express();

app.use(express.json());

  app.get("/all-dishes",(req,res)=>{
     const data=JSON.parse(fs.readFileSync("./data.json","utf-8"))

     
    let dishes=data.dishes;
      res.json({msg:"List of courses",dishes})
  })

   
app.get("/dishes/:id",(req,res)=>{
  // console.log(req.params)


  let dishesid=req.params.id;
    let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
    let dishes=data.dishes;
    let index=cources.findIndex((course)=>dishes.id==dishesid);


    if(index==-1){
      res.status(404).json({msg:"dishes Not Found"})
    }else{
      dishes.forEach((ele,id)=>{
        if(ele.id==dishesid){
          res.status(200).json({msg:"course detatil",dishes:ele})
        }
      })
    }



}

)




  app.post("/add-dishes",(req,res)=>{
    let newdishes=req.body;

    let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
     let dishes=data.dishes;
        let id=dishes[dishes.length-1].id+1;
        newdishes={id,...newdishes};
    cources.push(newdishes);
   
    fs.writeFileSync("./data.json",JSON.stringify(data))
    res.status(201).coursesend({msg:"New Course added",newdishes})
  })

   app.put("/update-course/:id",(req,res)=>{
    // console.log(req.params);

    let id=parseInt(req.params.id);
    let updatedishes=req.body;
   let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
   let dishes=data.dishes;
  //  console.log(cources);

  let index=cources.findIndex((dishes)=>dishes.id===id);
  // console.log(index)


  if(index===-1){
    res.status(404).json({msg:"dishes Not Found"})
  }else{
let updatecourses=cources.map((el,i)=>{
   if(el.id==id){
    return {...el,...updatedishes}
   }else{
    return el
   }
})
//replace with old course
data.cources=updatedishes
  //  console.log(index);

  fs.writeFileSync("./data.json",JSON.stringify(data));
   res.status(201).json({msg:"dishes updated"})
  }

    // res.send("updated")
   })
app.delete("/delete-dishes/:id",(req,res)=>{
  let id=req.params.id;
  let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
  let dishes=data.dishes;
    let index=dishes.findIndex((dishes)=>dishes.id==id);
    if(index==-1){
      res.status(404).json({msg:"dishes Not Found"});
    }else{
      let updatedishes=dishes.filter((el,i)=>{
        return el.id!=id;
      })
      data.dishes=updatedishes;
      fs.writeFileSync("./data.json",JSON.stringify(data));

      res.status(200).json({msg:"dishes deleted"})
    }

})
 


app.listen(3000,()=>{
    console.log("server started");
})