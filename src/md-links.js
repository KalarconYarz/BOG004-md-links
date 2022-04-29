// Se importan los modulos de node-methods
const {  
  originalPath,
  readRecursionDir,
  // isFileMd,
  // isFileOrDirectory,
  // walkingDirectory,
  readFilesContent } = require("./node-methods");

//node methods filesystem - path
const fs = require("fs");
const path = require("path");

// se crea funcion mdlinks
const mdLinks = (args) =>
  new Promise((resolve, reject) => {
    // captura de ruta a partir de arry de args
    const catchedPath = args[2];
    console.log("👀 Es una ruta absoluta?", path.isAbsolute(catchedPath));

    // Convierte ruta relativa a absoluta
    const absolutPath = originalPath(catchedPath);
    console.log(" 💨Conviertiendo ruta a Absoluta,", absolutPath);

    // Se Guarda el resultado de la ruta convertida invocando callback absolutPath 
    // se hace validacion de la ruta
    const resultValidatePath = originalPath(absolutPath);
    try {
      if (fs.existsSync(absolutPath)) {
        console.log(" 👀 Es una ruta Valida?", (fs.existsSync(absolutPath)));
      }
      } catch(err) {
      console.error(err)
      }
    

    // Se crea array para guardar el contenido de archivos.md
    let pathArrayMd = [];
    if (resultValidatePath) {
      const filesMdResp = readRecursionDir(pathArrayMd, absolutPath); // invocamos la función que nos da la recursividad
      console.log("📰 Archivos con extesion .md🤞 ", filesMdResp);
    } else {
      const invalidPath = "😱 La ruta ingresada no es válida";
      console.log(invalidPath);
    }

  });

// se exporta el modulo para usar funcion mdLinks
module.exports = mdLinks;


