// Modulos de NODE
const fs = require("fs"); // file system  fs: Proporciona una API para interactuar con el sistema de archivos.
const { resolve } = require("path");
const path = require("path"); //path: Proporciona utilidades para trabajar con rutas de archivos y directorios
const chalk = require("chalk");
const getLinks = require("./getLinks.js");

console.log(chalk.blue("Hello world!"));

// Verificar si el route es absoluto o relativo, hacerlo absoluto si es relativo
//Resuelve y normaliza la ruta

const originalPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert);
  pathAbsolute
    ? (converterPathResult = pathToConvert)
    : (converterPathResult = path.resolve(pathToConvert).normalize());
  return converterPathResult;
};

//Función recursiva para leer el contenido de un directorio
const readRecursionDir = (arrayPaths, fileAbsolutePath) => {
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory(); //statSync: se utiliza para devolver información sincrónicamente sobre la ruta de archivo dada
  // console.log("soy directorio 📘?", chalk.blue(isDirResult));
  if (isDirResult) {
    const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
    dirFileRes.forEach((file) => {
      const dirAbsolutepath = path.join(fileAbsolutePath, file);
      readRecursionDir(arrayPaths, dirAbsolutepath);
    });
  } else {
    const fileExtensionRes = path.extname(fileAbsolutePath); //obtine extension .md
    if (fileExtensionRes === ".md") {
      arrayPaths.push(fileAbsolutePath);
    } else {
      console.log(chalk.magentaBright(`
      ╔══════°❀•°✮°•❀°═════╗
      📰El archivo ${fileAbsolutePath}❌ no es MD
      ╚══════°❀•°✮°•❀°═════╝`))
    }
  }
  return arrayPaths;
}
  

// función para leer el contenido del archivo.md
const readFilesContent = (file) =>
   new Promise((resolve) => {
    const arr = [];
     fs.readFile(file, "utf-8", (err, data) => {
        if (err) {
          const resulErr = "😡 No se puede leer el archivo";
          console.log(resulErr, err);
        } else {
          resolve(getLinks(data, file))

//         //   resolve(getLinks(data , element));
//         //  console.log('Links Encontrados',(getLinks(data , element)));
// //          console.log('Links Encontrados',(getLinks(data , element)));
//           arr.push(getLinks(data, element));
//           // console.log('que hay?',arr)
//           // if (arrayPaths.length === arr.length) {
//             const arrayPlano = arr.flat()
//             arrayPlano


          //   console.log('soy arayplano',arrayPlano);
          //  resolve(arrayPlano);
      // };
       }
       } );
      });
    

  
  // });
//          resolve(getLinks(data , element));
//          console.log(chalk.cyan.bold('Links Encontrados',(getLinks(data , element))));
//          console.log('Links Encontrados',(getLinks(data , element)));

//         }
//       });
//     });
//   });

// const readFilesContent = (Filepath) =>
//   new Promise((resolve) => {
//     const arr = [];
//     Filepath.forEach((element) => {
//       fs.readFile(element, "utf8", (err, data) => {
//         if (err) {
//           const errorMessage = "❗ No se puede leer el contenido del archivo";
//           console.log(errorMessage);
//         } else {
//           arr.push(getLinks(data, element));
//           if (Filepath.length === arr.length) {
//             resolve(arr.flat());
//           }
//         }
//     });
//   });
// });

module.exports = {
  originalPath,
  readRecursionDir,
  readFilesContent,
};
