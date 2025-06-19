const Records = require("./records.model");
const { readFile } = require("./service");

const upload = async (req, res) => {
  const { file } = req;
  /* Acá va tu código! Recordá que podés acceder al archivo desde la constante file */
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  readFile(file.path); // Llama a la función para leer el archivo y procesarlo
  return res.status(200).json({ message: "successfully saved" });
};

const list = async (_, res) => {
  try {
    const data = await Records.find({}).limit(10).lean();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  upload,
  list,
};
