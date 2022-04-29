// Modulos de NODE
const fs = require('fs'); // file system  fs: Proporciona una API para interactuar con el sistema de archivos.
const { resolve } = require('path');
const path = require('path'); //path: Proporciona utilidades para trabajar con rutas de archivos y directorios


// Verificar si el route es absoluto o relativo, hacerlo absoluto si es relativo
//Resuelve y normaliza la ruta 

const originalPath = (pathToConvert) => {
  let converterPathResult;
  const pathAbsolute = path.isAbsolute(pathToConvert) 
  pathAbsolute
      ? converterPathResult = pathToConvert 
      : converterPathResult = path.resolve(pathToConvert).normalize();
  return converterPathResult;
}

//Función recursiva para leer el contenido de un directorio
const readRecursionDir = (arrayPaths, fileAbsolutePath) =>{
  const isDirResult = fs.statSync(fileAbsolutePath).isDirectory();
  console.log('soy directorio 📘?', isDirResult);
  if(isDirResult){
      const dirFileRes = fs.readdirSync(fileAbsolutePath); //recorrer el contenido de un directorio
      dirFileRes.forEach((file) => {
          const dirAbsolutepath = path.join(fileAbsolutePath, file);
          readRecursionDir(arrayPaths, dirAbsolutepath);
      });
  }else{
      const fileExtensionRes = path.extname(fileAbsolutePath);//obtine .md
      if(fileExtensionRes === '.md'){
          arrayPaths.push(fileAbsolutePath);
      }
  }
  return arrayPaths;
}

// funcion para revisar si es archivo md y leer su contenido
// const isFileMd = (filePath) => {
//   const fileExtensionResult = extensionName(filePath);
//   if(fileExtensionResult === '.md'){
//       return filePath;
//   }else{
//       const isFileMdError = 'Archivo no tiene extención .md';
//       return isFileMdError;
//   }
// };

// función para saber si es un directorio o archivo si es directorio : true y si es archivo: false
// const isFileOrDirectory =  (path) => new Promise((resolve) =>{ // sólo verifica si es directorio
//   fs.stat(path, (err, stats) => {
//       if (err) throw err;
//       const isDirResult = stats.isDirectory()
//       console.log('soy directorio?', isDirResult);
//       resolve(isDirResult);
//   });
// });

//Función para recorrer el contenido de un directorio
// const walkingDirectory = (arraysPaths) => {
//   const dirFiles = fs.readdirSync(arraysPaths);
//   console.log('Soy archivos del directorio',dirFiles);
//   return dirFiles;
// }

// función para leer el contenido de mi archivo
// Leer archivos md

const readFilesContent = (arrayPaths) => {
  arrayPaths.forEach((element) => {
      fs.readFile(element, 'utf8', (err, data) => {
        if (err){ 
        const resulErr = ' 😡 No se puede leer el contenido del array';
        reject()
      } else {
         resolve() 
         console.log("El contenido es: ", data);
        }
     
    //   if (err){
    //       const noReadContent = ' 😡 No se puede leer el contenido del array';
    //       console.log(noReadContent);
    //   }else{
    //       console.log(data);
    //   return data;
    // }
  // });
  })
  });
}




module.exports = {
    originalPath,
    readRecursionDir,
    // isFileMd,
    // isFileOrDirectory,
    // walkingDirectory,
    readFilesContent,
}
