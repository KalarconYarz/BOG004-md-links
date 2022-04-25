const mdLinks = (args) => {
  console.log("llego a md", args);
  // Modulos de NODE
  const fs = require("fs"); // file system modulo utilizado de node
  const path = require("path"); //captura la ruta

  // captura de ruta a partir de arry de args
  const terminalPath = args[2];

  // Resuelve y normaliza la  ruta de relativa a absoluta
  const pathAbsolute = path.resolve(terminalPath).normalize();
  console.log("Ruta convertida Absoluta", pathAbsolute);

  // verifica si existe la ruta
  const validatePath = (path) => fs.existsSync(path);

  // función para saber si es un directorio o archivo si es directorio : true y si es archivo: false
  const isFileOrDirectory = (pathToCheck) => {
    fs.stat(pathToCheck, (err, stats) => {
      if (err) throw err;
      console.log("soy directorio?", stats.isDirectory());
    });
  };
  // función para leer el contenido de mi archivo
  const readFile = (pathToRead) => {
    fs.readFile(pathToRead, "utf8", function (err, data) {
      if (err) throw err;
      console.log(data);
    });
  };
  // Guardo el rersultado e invoco la función pasando conmo argumento pathAbsolute
  const resultValidatePath = validatePath(pathAbsolute);

  if (resultValidatePath === true) {
    isFileOrDirectory(pathAbsolute);
    readFile(pathAbsolute);
  } else {
    console.log("Fin del programa");
  }
};

// Extrae el nombre de la extension del archivo
// const extension = path.extname('prueba.md');
// console.log('es un archivo md' + extension);
// Obtiene la ruta absoluta del directorio y el archivo actual
// const dirName = path.dirname(__dirname); //dirname obtiene la ruta
// const filename= path.dirname(__filename); //filename es el archivo actual
// // console.log('directory-name', dirName);

// });

module.exports = mdLinks;
