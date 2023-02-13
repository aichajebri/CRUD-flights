const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const passengerSchema = require("../validation/passengers");
const getAllPassengers = async (req, res) => {
  let passengers = await prisma.passengers.findMany({
    include: {
      person_id: true,
      flight_id: true,
    },
  });
  res.json(passengers);
};

const getPassengerById = async (req, res) => {
  let id = Number(req.params.id);
  let passenger = await prisma.passengers.findFirst({
    where: {
      id: id,
    },
  });
  if (!passenger) {
    res.status(404).json({ msg: "passenger does not exist" });
    return;
  }
  res.json(passenger);
};

const createPassenger = async (req, res) => {
  // nekhou el body mtaa el req
  let { value, error } = passengerSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  let { origin_id, destination_id, duration } = req.body;
  console.log(req.body);
  try {
    let newPassenger = await prisma.passengers.create({
      data: {
        person_id,
        flight_id,
      },
    });
    console.log(newPassenger);
    res.status(201).json(newPassenger);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ msg: "Error in body of the request please verify the data" });
    return;
  }
};

const updatePassenger = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);
  let { value, error } = passengerSchema.validate(req.body);
  console.log(value);
  console.log(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  try {
    console.log(id);
    let updatedPassenger = await prisma.passengers.update({
      where: {
        id: id,
      },
      data: value,
    });
    res.json(updatedPassenger);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deletePassenger = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);

  try {
    let deletedPassenger = await prisma.passengers.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedPassenger);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  // delete
  // respond with the deleted passengers
};

module.exports = {
  getAllPassengers,
  getPassengerById,
  createPassenger,
  updatePassenger,
  deletePassenger,
};
