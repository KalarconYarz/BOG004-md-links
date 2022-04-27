// Se importan los modulos de node-methods
const {
  converterPath,
  validatePath,
  isFileOrDirectory,
  readDirectoryFiles,
  isFileMd,
  readFile,
} = require('./node-methods')


// se crea funcion mdlinks
const mdLinks = (args) => new Promise ((resolve, reject) => {
   //node methods filesystem - path
   const fs = require('fs');
   const path = require('path');

  // captura de ruta a partir de arry de args
  const catchedPath = args[2];
  console.log(catchedPath);
  console.log('Es una ruta absoluta?', path.isAbsolute(catchedPath))

  // Convierte ruta relativa a absoluta
  const absolutePath = converterPath(catchedPath);
  console.log('validando Path,', absolutePath);

  // Se Guarda el resultado de la ruta convertida invocando callback absolutePath
  const resultValidatePath = validatePath(absolutePath);
  console.log('Es una ruta Valida?,', resultValidatePath);

// Se crea array para guardar el contenido de archivos.md
const pathArray = [];
//Condicional que valida la ruta
    if(resultValidatePath){ // Ingresa sólo si es ruta válida
      isFileOrDirectory(absolutePath)//ingresa sólo si es directorio
        .then((isDirResult) => {
            if(isDirResult){
                console.log('OJO Recursividad');
                const dirFiles = readDirectoryFiles(absolutePath);
                resolve(dirFiles);
                //Debería retornar un array con una o más rutas
            }else{
                console.log('Guardar la ruta md en array');
                const isFileMdResult = isFileMd(absolutePath);
                pathArray.push(isFileMdResult);
                console.log(pathArray)
                const fileContent = readFile(absolutePath); // debe leer el contenido del Archivo .md
                resolve(fileContent);
            }
        })
        .catch((error) => {
            console.log('Archivo md no encontrado', error);
        });
    }else{
        const invalidPath = 'Ruta Invalida';
        console.log(invalidPath);
        return invalidPath;
    }    
});


//   // Se crea condicional si la ruta es valida
//   if(resultValidatePath){ // Ingresa si la ruta es Valida
//     console.log('Que Soy?', isFileOrDirectory(absolutePath));
//     isFileOrDirectory(absolutePath) // ingresa si es un directorio
//     .then((isDirResult) => {
//       if (isDirResult) {
//         console.log('Recusrividad Ojoo');
//         const dirFiles = readDirFiles(absolutePath);
//         resolve(promise.all(dirFiles));
//       } else {
//         const fileContent = readFile(absolutePath); // se debe revisar si es archivo.md
//         console.log('Contenido del arhivo', fileContent);
//         resolve(fileContent);
//       }
//     })
//     .catch((error) => {
//       console.log('Erroorr', error);
//     });
//   } else {
//     console.log('OTRO else');
//     const invalidPath = 'Ruta no Valida';
//     reject(new Error(invalidPath));
//   }
// }

  // Guardo el rersultado e invoco la función pasando conmo argumento pathAbsolute
  
// Extrae el nombre de la extension del archivo
// const extension = path.extname('prueba.md');
// console.log('es un archivo md' + extension);
// Obtiene la ruta absoluta del directorio y el archivo actual
// const dirName = path.dirname(__dirname); //dirname obtiene la ruta
// const filename= path.dirname(__filename); //filename es el archivo actual
// // console.log('directory-name', dirName);

// });


// se exporta el modulo para usar funcion mdLinks
module.exports = mdLinks;