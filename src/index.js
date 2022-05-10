// Importamos Módulos de node
const {
  converterPath,
  validatePath,
  fileSearch,
  readFileContent,
  httpPetitionStatus,
} = require("./node-methods.js");

//<<<<Se importa Librería chalk>>>>
const chalk = require("chalk");

//<<<< Función mdLinks >>>>
const mdLinks = (path, options) => new Promise((resolve, reject) => {

//<<<< convertir ruta capturada en absoluta >>>>-
    const pathAbsolute = converterPath(path);
//<<<< Guardo el rersultado e invoco la función pasando como argumento pathAbsolute >>>>
    const resultValidatePath = validatePath(pathAbsolute);

    //<<<< Condicional que valida la ruta y la recursividad invocando la función fileSearch desde nodeMethods >>>>
    let arrayFilePathMd = [];
    if(resultValidatePath === false){
      reject((chalk.redBright` 
      ╔══════°❀•°✮°•❀°═════╗
        ❌  Ruta invalida ❌
      ╚══════°❀•°✮°•❀°═════╝`
      ))
    }else if(resultValidatePath){
      const filesMd = fileSearch(arrayFilePathMd, pathAbsolute) // invocamos la función que nos da la recursividad
      if (filesMd.length === 0){
        reject(chalk.redBright( `
        ╔══════°❀•°✮°•❀°═════╗
        📚El directorio No contiene Archivos ❌
         ╚══════°❀•°✮°•❀°═════╝`
            ))
        }else{
          readFileContent(arrayFilePathMd) //👈 Invocamos la funcion readFiles 
          .then((objectLinks)=>{
            if (objectLinks.length === 0) {
              reject(chalk.redBright(` 
              ╔══════°❀•°✮°•❀°═════╗
                📕El archivo no contiene Links
              ╚══════°❀•°✮°•❀°═════╝`
              ));
            } else {
              if (options.validate === true) {
                httpPetitionStatus(objectLinks).then(response => {
                  resolve(response)
  
                })
              } else {
                resolve(objectLinks);
              }
            }
          })
        }
    }

  });

module.exports = mdLinks;