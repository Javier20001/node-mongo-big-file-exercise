const records = require("./records.model");

const create = (data) => records.create(data); // Inserta un registro en la colección

module.exports = {
  create,
};
