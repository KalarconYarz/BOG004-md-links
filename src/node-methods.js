// Modulos de NODE
const fs = require('fs'); // file system modulo utilizado de node
const path = require('path'); //captura la ruta

//Resuelve y normliza la ruta 
const converterPath = (pathToConvert) => {
    let  pathToConvertResult;
    path.isAbsolute(pathToConvert)
      ? (pathToConvertResult = pathToConvert)
      : (pathToConvertResult = path.resolve(pathToConvert).normalize());
    return pathToConvertResult;
  };

  // verifica si existe la ruta
 const validatePath = (path) => fs.existsSync(path);

 // función para saber si es un directorio o archivo si es directorio : true y si es archivo: false
 const isFileOrDirectory = (pathToCheck) => new Promise((resolve) => { // solo resuelve si es un Directorio
   fs.stat(pathToCheck, (err, stats) => {
     if (err) throw err;
     const isDirResult = stats.isDirectory()
     console.log('Es un directorio?', stats.isDirectory());
     resolve(isDirResult);
   });
 });

 // Leer contenido del directorio
 const readDirectoryFiles = (pathToCheckContent) => {
   const dirfiles = fs.readdirSync(pathToCheckContent);
   console.log(dirfiles)
   return dirfiles;
 }

 // Función para saber la extención de un archivo
const extensionName = (filePath) =>{
  const extension = path.extname(filePath); //obtener la extención del archivo
  return extension;
}

  // funcion para revisar si es archivo md y leer su contenido
const isFileMd = (filePath) => {
  const fileExtensionResult = extensionName(filePath);
  if(fileExtensionResult === '.md'){
      return filePath;
  }else{
      const isFileMdError = 'Archivo.md no encontrado';
      return isFileMdError;
  }
};
// función para leer el contenido de mi archivo
const readFile = (pathToRead) => {
  fs.readFile(pathToRead, 'utf8', function (err, data) {
   console.log(readFile) 
   if (err) throw err;
   console.log(data);
    return data;
  });
};
 

module.exports = {
 converterPath,
 validatePath,
 isFileOrDirectory,
 readDirectoryFiles,
 extensionName,
 isFileMd,
 readFile,
}

