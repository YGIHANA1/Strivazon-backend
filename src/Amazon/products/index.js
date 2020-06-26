const express=require("express")
const fs = require("fs-extra")
const uniqid=require("uniqid")
const path=require("path")
 

const router=express.Router()

const readFile=(fileName)=>{
const buffer=fs.readFileSync(path.join(__dirname,fileName))
const fileContent=buffer.toString
return JSON.parse(fileContent)
}

router.get("/:id",(req,res,next)=>{
const productsDB=readFile("product.json")
const product=productsDB.filter((product)=>product.ID === req.params.id)
res.send(product)
})

// product/search/game of thrones
router.get("/search/:query",(req,res,next)=>{
    const productsDB=readFile("product.json")
    const filteredProduct=productsDB.filter((product)=>product.name.toLowercase().includes(req.query.query.toLowercase()))

    res.send(filteredProduct)
     
    })
    
// game of thrones , games of hunger

router.get("/",(req,res,next)=>{
const productsDB=readFile("products.json")
res.send(productDB)
})

router.post("/",(req,res,next)=>{})


router.put("/:id",(req,res,next)=>{})


router.delete("/:id",(req,res,next)=>{})

module.exports= router