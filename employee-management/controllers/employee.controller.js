const fs=require("fs");
const { getData, addorUpdateData } = require("../models/employee.model");

const getAllemp=(req,res)=>{
 let data=getData().employee;
 res.status(200).json({msg:"List of cources",data})

}

const addemployee=(req,res)=>{
 let data=getData().data;
 let employee=data.employees;

 let newEmp=req.body;
   
 let id=employee.length>0?employee[employee.length-1].id+1:1;
    newEmp={id,...newEmp}
    employee.push(newEmp);

    data.employees=employee;
    addorUpdateData(data);
    res.json({data:employee})
}


const updateEmployee=(req,res)=>{
    let id=req.params.id;
    let data=getData().data;
      let updateemp=req.body;

    let employee=data.employees;
     
    let index=employee.findIndex((emp)=>emp.id==id);

    if(index==-1){
        res.status(404).json({msg:"Employee not found"})
    }else{

       let updateEmployee=employee.map((ele)=>{
        if(ele.id==id){
            return{...ele,...updateemp}
        }else{
            return ele;
        }
       }
    )
    data.employees=updateEmployee;
    addorUpdateData(data);
    res.status(201).json({msg:"course updated"})

    }

}


let deleteEmployee=(req,res)=>{
    let id=req.params.id;
    
    let data=getData().data;

    let employee=data.employees;
    let index=employee.findIndex((emp)=>emp.id==id);
    
    if(index==-1){
        res.status(404).json({msg:"employee not found"})
    }else{
       let deleteemp= employee.filter((emp)=>{
          return emp.id!=id;
        })
         data.employees=deleteemp;
    }
   
    addorUpdateData(data);
    res.json({msg:"data deleted"})
}
module.exports ={getAllemp,addemployee,updateEmployee,deleteEmployee}