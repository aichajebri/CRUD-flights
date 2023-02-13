const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const airportSchema = require("../validation/airports");
const getAllAirports = async (req, res) => {
  let airports = await prisma.airports.findMany({
    include: {
      origin: true,
      destination: true,
    },
  });
  res.json(airports);
};

const getAirportById = async (req, res) => {
  let id = Number(req.params.id);
  let airport = await prisma.airports.findFirst({
    where: {
      id: id,
    },
  });
  if (!airport) {
    res.status(404).json({ msg: "airport does not exist" });
    return;
  }
  res.json(airport);
};

const createAirport = async (req, res) => {
  // nekhou el body mtaa el req
  let { value, error } = airportSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  let { code, city } = req.body;
  console.log(req.body);
  try {
    let newAirport = await prisma.airports.create({
      data: {
        code,
        city,
      },
    });
    console.log(newAirport);
    res.status(201).json(newAirport);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ msg: "Error in body of the request please verify the data" });
    return;
  }
};

const updateAirport = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);
  let { value, error } = airportSchema.validate(req.body);
  console.log(value);
  console.log(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  try {
    console.log(id);
    let updatedAirport = await prisma.airport.update({
      where: {
        id: id,
      },
      data: value,
    });
    res.json(updatedAirport);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deleteAirport = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);

  try {
    let deletedAirport = await prisma.airports.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedAirport);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  // delete
  // respond with the deleted airport
};

module.exports = {
  getAllAirports,
  getAirportById,
  createAirport,
  updateAirport,
  deleteAirport,
};
