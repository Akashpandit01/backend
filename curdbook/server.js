
const express=require("express");
 const fs=require("fs");
const { json } = require("stream/consumers");
const app=express();

app.use(express.json());

  app.get("/all-books",(req,res)=>{
     const data=JSON.parse(fs.readFileSync("./data.json","utf-8"))

     
    let books=data.books;
      res.json({msg:"List of books",books})
  })

   
app.get("/books/:id",(req,res)=>{
  

  

  let booksid=req.params.id;
    let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
    let books=data.books;
    let index=cources.findIndex((books)=>books.id==booksid);


    if(index==-1){
      res.status(404).json({msg:"books Not Found"})
    }else{
      books.forEach((ele,id)=>{
        if(ele.id==booksid){
          res.status(200).json({msg:"books detatil",books:ele})
        }
      })
    }



}

)




  app.post("/add-books",(req,res)=>{
    let newbooks=req.body;

    let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
     let books=data.books;
        let id=books[books.length-1].id+1;
        newbooks={id,...newbooks};
    cources.push(newbooks);
   
    fs.writeFileSync("./data.json",JSON.stringify(data))
    res.status(201).send({msg:"New books added",newbooks})
  })

   app.put("/update-books/:id",(req,res)=>{

    // console.log(req.params);

    let id=parseInt(req.params.id);
    let updatebooks=req.body;
   let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
   let books=data.books;
  //  console.log(cources);

  let index=books.findIndex((books)=>books.id===id);
  // console.log(index)


  if(index===-1){
    res.status(404).json({msg:"books Not Found"})
  }else{
let updatebooks=cources.map((el,i)=>{
   if(el.id==id){
    return {...el,...updatebooks}
   }else{
    return el
   }
})
//replace with old books
data.books=updatebooks
  //  console.log(index);

  fs.writeFileSync("./data.json",JSON.stringify(data));
   res.status(201).json({msg:"books updated"})
  }

    // res.send("updated")
   })
app.delete("/delete-books/:id",(req,res)=>{
  let id=req.params.id;
  let data=JSON.parse(fs.readFileSync("./data.json","utf-8"));
  let books=data.books;
    let index=books.findIndex((books)=>books.id==id);
    if(index==-1){
      res.status(404).json({msg:"books Not Found"});
    }else{
      let updatebooks=books.filter((el,i)=>{
        return el.id!=id;
      })
      data.books=updatebooks;
      fs.writeFileSync("./data.json",JSON.stringify(data));

      res.status(200).json({msg:"books deleted"})
    }

})
 


app.listen(3000,()=>{
    console.log("server started");
})