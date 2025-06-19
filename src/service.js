const recordsRepository = require("./repository"); // Importa el repositorio para manejar la base de datos
const fs = require("fs"); // Importa el módulo de sistema de archivos
const csv = require("csv-parser"); // Importa el módulo para parsear CSV

function readFile(filePath) {
  if (!fs.existsSync(filePath)) {
    // verifica si existe
    // si no existe, muestra un error
    console.error(`El archivo ${filePath} no existe.`);
    return;
  }

  const stream = fs.createReadStream(filePath); // crea un stream de lectura del archivo

  stream
    .pipe(csv())
    .on("data", async (fila) => {
      // procesa cada fila del CSV
      stream.pause(); // ahora sí se detiene la lectura
      try {
        await recordsRepository.create(fila); // inserta fila
      } catch (err) {
        console.error("Error al insertar:", err.message);
      }
      stream.resume(); // reanuda cuando terminó
    })
    .on("end", () => {
      // cuando termina de leer el archivo
      console.log("Todo insertado.");
      fs.unlink(filePath, () => {}); // borra el archivo
    })
    .on("error", (err) => console.error("Stream error:", err)); // maneja errores del stream
}

module.exports = {
  readFile,
};
