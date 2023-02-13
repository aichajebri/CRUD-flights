const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const peopleSchema = require("../validation/people");
const getAllPersons = async (req, res) => {
  let person = await prisma.people.findMany({
    include: {
      first: true,
      last: true,
    },
  });
  res.json(person);
};

const getPersonById = async (req, res) => {
  let id = Number(req.params.id);
  let person = await prisma.people.findFirst({
    where: {
      id: id,
    },
  });
  if (!peerson) {
    res.status(404).json({ msg: "person does not exist" });
    return;
  }
  res.json(person);
};

const createPerson = async (req, res) => {
  // nekhou el body mtaa el req
  let { value, error } = peopleSchema.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  let { origin_id, destination_id, duration } = req.body;
  console.log(req.body);
  try {
    let newPerson = await prisma.people.create({
      data: {
        person_id,
        flight_id,
      },
    });
    console.log(newPerson);
    res.status(201).json(newPerson);
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .json({ msg: "Error in body of the request please verify the data" });
    return;
  }
};

const updatePerson = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);
  let { value, error } = peopleSchema.validate(req.body);
  console.log(value);
  console.log(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
    return;
  }
  try {
    console.log(id);
    let updatedPerson = await prisma.people.update({
      where: {
        id: id,
      },
      data: value,
    });
    res.json(updatedPerson);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
};

const deletePerson = async (req, res) => {
  // recuprere le id
  let id = Number(req.params.id);

  try {
    let deletedPerson = await prisma.people.delete({
      where: {
        id: id,
      },
    });
    res.json(deletedPerson);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
  // delete
  // respond with the deleted people
};

module.exports = {
  getAllPersons,
  getPersonById,
  createPerson,
  updatePerson,
  deletePerson,
};
