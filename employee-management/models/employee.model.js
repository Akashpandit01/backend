const fs=require('fs');
const getData=()=>{
    let data=JSON.parse(fs.readFileSync("./db.json","utf-8"));

    let employee=data.employees;
    return {data,employee}
}
const addorUpdateData = (data) => {
   fs.writeFileSync("./db.json", JSON.stringify(data)); // pretty JSON
};

module.exports={getData,addorUpdateData};