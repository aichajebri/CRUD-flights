const router = require("express").Router()

const { getAllFlights,getFlightById,createFlight,updateFlight,deleteFlight } = require("../controllers/flights")


router.get("/",getAllFlights)
router.get("/:id",getFlightById)
router.post("/",createFlight)
router.put("/:id",updateFlight)
router.delete("/:id",deleteFlight)
module.exports = router