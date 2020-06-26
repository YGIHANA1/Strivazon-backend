const fs = require("fs-extra");
const uniqid = require("uniqid");
const { join } = require("path");

const write = async (pathName, newName, data) => {
  const { originalname } = data; // es6
  const [name, extension] = originalname.split("."); // image.png
  let writtenFile = fs.writeFile(
    join(pathName, `${newName}.${extension}` || data.originalname),
    data.buffer
  );
  return {
    message: "ok file written",
  };
};
/*const remove= async (pathName,id)=>{
    let jsonArray = await fs.readFile(pathName);
    jsonArray = jsonArray.filter(object=>object.id!==id)
    let writtenFile = fs.writeFile(pathName,jsonArray)
    return  jsonArray;
}*/
/*
const getByName= async (pathName,id)=>{
    let jsonArray = await fs.readFile(pathName);
    let filtered = jsonArray.filter(object=>object.id===id);
    if(filtered.length>0){
        return filtered[0];
    }
    else{
        return -1;
    }
}
*/

module.exports = {
  write,
};
