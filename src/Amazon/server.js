const express=require("express")
const productsRouter=require("./products/")
const port =process.env.PORT
const server =express()
//Routes
server.use(express.json())
server.use("/products",productsRouter)


server.listen(port,()=>{
console.log(`the server is running on port on ${process.env.API_URL}:${port}`)
})