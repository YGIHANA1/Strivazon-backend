const notFound = (req,res,next)=>{
    if(!req.route){
        res.status(404).send({error:`Endpoint ${req.originalUrl} with method ${req.method} not found!`})
    }
}
const sourceNotFound = (error,req,res,next)=>{
    res.status(404).send({error})
}

const parameterError = (error,req,res,next)=>{
    res.status(500).send({message:error.message})
}

module.exports={notFound,sourceNotFound,parameterError}