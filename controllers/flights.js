
const { PrismaClient }  =  require('@prisma/client')
const prisma = new PrismaClient()
const flightSchema = require("../validation/flights")
const getAllFlights = async (req,res)=>{
    let flights = await prisma.flights.findMany({
        include : {
            origin : true,
            destination : true
        }
    })
    res.json(flights)
}

const getFlightById = async (req,res)=>{
    let  id   = Number(req.params.id)
    let flight = await prisma.flights.findFirst({
        
        where : {
            id : id
        }
    })
    if(!flight){
        res.status(404).json({msg:"flight does not exist"})
        return
    }
    res.json(flight)
}

const createFlight = async (req,res)=>{
    // nekhou el body mtaa el req
    let { value,error } = flightSchema.validate( req.body)
    if(error){
        console.log(error)
        res.status(400).json({msg: error.details[0].message})
        return
    }
    let { origin_id,destination_id,duration} = req.body
    console.log(req.body)
    try  {
        let newFlight = await prisma.flights.create({
            data : {
                origin_id,
                destination_id,
                duration
            }
        })
        console.log(newFlight)
        res.status(201).json(newFlight)

    }catch(e){
        console.log(e)
        res.status(400).json({msg:"Error in body of the request please verify the data"})
        return
    }
   
}


const updateFlight = async (req,res)=>{
    // recuprere le id 
    let id = Number(req.params.id)
    let { value,error } = flightSchema.validate( req.body)
    console.log(value)
    console.log(req.body)
    if (error){
        res.status(400).json({msg: error.details[0].message})
        return
    }
    try {   
        console.log(id)
        let updatedFlight = await prisma.flights.update({
          where : {
            id: id
          },
          data : value
        })
        res.json(updatedFlight)
    }catch(e){
        res.status(400).json({msg: e.message})
    }
}


const deleteFlight = async (req,res)=>{
    // recuprere le id 
    let id = Number(req.params.id)

    try {
        let deletedFlight = await prisma.flights.delete({
            where : {
                id:id
            }
        }) 
        res.json(deletedFlight)
    }catch(err){
        res.status(400).json({msg:err.message})
    }
    // delete
    // respond with the deleted flight
}

module.exports = {
    getAllFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlight
}