const router = require("express").Router();

const {
  getAllAirports,
  getAirportById,
  createAirport,
  updateAirport,
  deleteAirport,
} = require("../controllers/airports");

router.get("/", getAllAirports);
router.get("/:id", getAirportById);
router.post("/", createAirport);
router.put("/:id", updateAirport);
router.delete("/:id", deleteAirport);
module.exports = router;
